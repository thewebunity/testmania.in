/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react redux
import { useDispatch, useSelector } from "react-redux";

// react router
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// components
import ProjectInformation from "./ProjectInformation";
import Notification from "examples/Notification";

// store
import { getAvailableExams } from "store/exams-slice";
import { notificationActions } from "store/notification-slice";
import { CircularProgress } from "@mui/material";
import { examsActions } from "store/exams-slice";

function Projects() {
  const dispatch = useDispatch();

  const notificationSlice = useSelector((state) => state.notification);
  const exams = useSelector((state) => state.exams?.exams);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAvailableExams());
      
      setIsLoading(false);
    };

    getData();

    return () => {
     
      dispatch(examsActions.clearExams());
    };
  }, []);

  const navigate = useNavigate();
  
  if(exams.length >0 ){
   
   
    return(
      <>
  <>
      {notificationSlice.open && (
        <Notification
          color={`${notificationSlice.color}`}
          text="Exams Available"
          onClose={() => dispatch(notificationActions.closeOpen())}
          open={notificationSlice.open}
        />
      )}
    </>
  
      <Card>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Exams Available
            </MDTypography>
          </MDBox>
        </MDBox>
        {isLoading && (
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={3}
          >
            <CircularProgress />
          </MDBox>
        )}
        {!isLoading && <ProjectInformation exams={exams} />}
      </Card>
    </>
    )
  }
  
else{
  return (
    <>
 
  
      <Card>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Exams Available
            </MDTypography>
          </MDBox>
        </MDBox>
        {isLoading && (
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={3}
          >
            <CircularProgress />
          </MDBox>
        )}
        {!isLoading && <ProjectInformation exams={exams} />}
      </Card>
    </>
  );
}
  
}

export default Projects;
