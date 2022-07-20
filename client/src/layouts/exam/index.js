import { useState, useEffect } from "react";

// react redux
import { useDispatch, useSelector } from "react-redux";

// react router dom
import { useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";

// material ui
import { CircularProgress, Grid } from "@mui/material";

// theme
import MDBox from "components/MDBox";

// store
import {
  getCurrentExam,
  updateAnswer,
  updateFlag,
  submitExam,
} from "../../store/exams-slice";

// components
import ExamNavbar from "./navbar";
import QuestionsList from "./questions-list";
import QuestionDetail from "./question-detail";
import MDButton from "components/MDButton";
import AlertDialog from "components/AlertDialog";
import MDTypography from "components/MDTypography";

export default function Exam() {
  const exam = useSelector((state) => state.exams.current);
  const dispatch = useDispatch();
  const history = createBrowserHistory();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await dispatch(getCurrentExam(id));
      if (res === true) {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    return history.listen(() => {
      // listen
      if (history.action === "POP") {
        history.go(1);
      }
    });
  }, [history]);

  const [index, setIndex] = useState(0);
  const handleAnswerChange = async (val) => {
    await dispatch(updateAnswer({ val, index }));
  };

  const handleFlagChange = async (val) => {
    await dispatch(updateFlag({ flag: val, index }));
  };

  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);
  const handleSubmit = async () => {
    await dispatch(submitExam(id));
    navigate(`/exams/view/${id}`);
  };

  return (
    <>
      {showDialog && (
        <AlertDialog
          title={`Submit Exam`}
          content={`Are you sure you want to submit the exam?`}
          button1={`Cancel`}
          button2={`Yes`}
          open={showDialog}
          onClose={() => {
            setShowDialog(false);
          }}
          handleSubmit={handleSubmit}
        />
      )}
      <MDBox display={`flex`} m={5}>
        {isLoading && (
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            m={10}
          >
            <CircularProgress />
          </MDBox>
        )}
        {!isLoading && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MDBox
                display="flex"
                alignItems="space-between"
                justifyContent="space-between"
              >
                <MDTypography variant="h5">
                  {new Date().toLocaleDateString()}
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="info"
                  size={`medium`}
                  onClick={() => setShowDialog(true)}
                >
                  Submit Exam
                </MDButton>
              </MDBox>
            </Grid>

            {/* Exam Title */}
            <Grid item xs={12} md={12}>
              <ExamNavbar title={exam.title} duration={exam.duration} />
            </Grid>

            <Grid item xs={12} md={2}>
              <QuestionsList
                questions={exam.questions}
                currentIndex={index}
                onChange={(val) => setIndex(() => val)}
              />
            </Grid>

            <Grid item xs={12} md={10} mb={10}>
              <QuestionDetail
                question={exam.questions[index]}
                index={index}
                onChange={handleAnswerChange}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <MDBox
                position="fixed"
                bottom={0}
                right={0}
                width="100%"
                m={0}
                p={4}
                display="flex"
                alignItems="space-between"
                justifyContent="space-between"
                bgColor="#fff"
              >
                <MDButton
                  disabled={index === 0}
                  variant="contained"
                  color="success"
                  onClick={() => index > 0 && setIndex(() => index - 1)}
                >
                  &larr;&nbsp;&nbsp;&nbsp;Previous
                </MDButton>
                <MDButton
                  variant="contained"
                  color="warning"
                  onClick={() =>
                    exam.questions[index].isFlagged
                      ? handleFlagChange(false)
                      : handleFlagChange(true)
                  }
                >
                  Flag
                </MDButton>
                <MDButton
                  disabled={index === exam.questions.length - 1}
                  variant="contained"
                  color="success"
                  onClick={() =>
                    index < exam.questions.length - 1 &&
                    setIndex(() => index + 1)
                  }
                >
                  Next&nbsp;&nbsp;&nbsp;&rarr;
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        )}
      </MDBox>
    </>
  );
}
