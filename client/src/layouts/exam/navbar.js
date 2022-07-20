// react
import React, { useEffect } from "react";

// react redux
import { useDispatch } from "react-redux";

// react router dom
import { useParams, useNavigate } from "react-router-dom";

// react countdown
import Countdown from "react-countdown";

// material ui
import { Card } from "@mui/material";

// theme
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

// store
import { submitExam } from "store/exams-slice";

export default function ExamNavbar(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      dispatch(submitExam(id));
      navigate(`/exams/view/${id}`);

      return <span>Exam Completed</span>;
    } else {
      // Render a countdown
      return hours < 1 ? (
        <span>
          {minutes}:{seconds}
        </span>
      ) : (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let remainingTime = window.localStorage.getItem("remainingTime");

      if (remainingTime) {
        window.localStorage.setItem("remainingTime", remainingTime - 2000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <MDBox display="flex" alignItems="center" justifyContent="space-between">
        <MDTypography variant="h3" p={2}>
          {props.title}
        </MDTypography>

        <MDTypography variant="h3" p={2}>
          <Countdown
            date={
              Date.now() +
              parseInt(window.localStorage.getItem("remainingTime"))
            }
            renderer={renderer}
            zeroPadTime={2}
          />
        </MDTypography>
      </MDBox>
    </Card>
  );
}
