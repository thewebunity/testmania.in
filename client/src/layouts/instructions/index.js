/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react router dom
import { useNavigate, useParams } from "react-router-dom";

// react redux
import { useDispatch } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// store
import { beginExam } from "store/exams-slice";
import PageLayout from "examples/LayoutContainers/PageLayout";

function Instructions() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBegin = async () => {
    try {
      const res = await dispatch(beginExam(id));
      

      if (res === true) {
        navigate(`/exams/begin/${id}`);
      }
    } catch (err) {
      
    }
  };

  return (
    <PageLayout>
      <MDBox mx={20} my={15}>
        <MDBox mt={4.5}></MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDTypography variant="h1">Instructions</MDTypography>
              <br />
              <MDTypography variant="body1">
                1. Once you begin the exam, the timer will begin.
                <br />
                2. You <b>cannot refresh the page</b> once the exam starts.
                <br />
                3. Once the duration ends, the exam will be submitted
                automatically.
                <br />
                4. You will be redirected to the results page.
                <br />
                5. You will be able to see your score and the correct answers.
                <br />
                <br />
              </MDTypography>
              <MDTypography variant="subtitle">
                Are you ready to begin your exam?
              </MDTypography>
              <MDTypography variant="h2" color="success" py={4}>
                Best of Luck!
                <br />
              </MDTypography>

              <MDButton
                variant="contained"
                color="info"
                cursor="pointer"
                onClick={() => handleBegin()}
              >
                <Icon>create</Icon>&nbsp;&nbsp;&nbsp;Begin Test
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </PageLayout>
  );
}

export default Instructions;
