import React from "react";

// react router
import { useNavigate } from "react-router-dom";


// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import Icon from "@mui/material/Icon";
import { useState, useEffect } from "react";



// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// Soft UI Dashboard Materail-UI example components
import DataTable from "examples/Tables/DataTable";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

let columns, rows;
let examId;
let a;

export default function ProjectInformation(props) {

const navigate = useNavigate();
function t(id , date){
  setTimeout(() => 
      {
        var  currentDateTime=new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
        if (new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }) == currentDateTime) {
         
          
         
          navigate(`/instructions/begin/${id}`);

        }
        else {
         
          t(id,date);
        }

 } , 5000);
};


  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  
  const [days, setdays] = useState(
    {
  
        d: '',
    }
  );
  const [hours, sethours] = useState(
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  );

  const [dd, setdd] = useState(
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  );
  const [minutes, setminutes] = useState(
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  );
  const [seconds, setseconds] = useState(
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  );
  function remaing(countDownDate, index){
    useEffect(() => {
      const interval = setInterval(() => {
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
            
        // Calculating the days, hours, minutes and seconds left
        setdays({...days, d:  Math.floor(timeleft / (1000 * 60 * 60 * 24))});
        dd[index]= Math.floor(timeleft / (1000 * 60 * 60 * 24));
        hours[index] =Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes[index]= Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        seconds[index] = Math.floor((timeleft % (1000 * 60)) / 1000);
      
     if(dd[index]==0 && hours[index]==0 && minutes[index]==1 && seconds[index]==0 ){
      NotificationManager.success('Just one minut to start the exam Please stay here ','',6000);
     }
     if(dd[index]==0 && hours[index]==0 && minutes[index]==0 && seconds[index]==10){
      NotificationManager.success('Test will start at 10 seconds ','',6000);
     }
            
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  }

 

  columns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "subject", accessor: "subject", align: "left" },
    { Header: "Start Date", accessor: "startDate", align: "left" },
    { Header: "duration", accessor: "duration", align: "left" },
    { Header: "marks", accessor: "marks", align: "left" },
    { Header: "Remaining Time", accessor: "Remaining", align: "left" },
   
    
  ];
  var button;

  rows =
    props.exams?.length > 0 &&
    props.exams?.map((exam , index) => {
      var countDownDate = new Date(exam.startDate).getTime();
     remaing(countDownDate , index)
      

    
     t(exam.id,exam.startDate);
      
 

      // <MDButton
      //variant="contained"
      //color="info"
      //onClick={() => navigate(`/instructions/begin/${exam.id}`)}
    //>
      //<Icon>create</Icon>&nbsp;&nbsp;&nbsp;Begin Test
    //</MDButton>;
   
    
          
        
      
       
      
   
     
      
      
      return {
        
        name: (
          
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.title}
          </MDTypography>
        ),
        subject: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.subject?.name}
          </MDTypography>
        ),
        startDate: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {new Date(exam.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </MDTypography>
        ),
        duration: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.duration} mins
          </MDTypography>
        ),
        marks: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.marks * exam.questions.length}
          </MDTypography>
        ),
        action: (
          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            {exam.isSubmitted ? (
              <MDButton
                variant="contained"
                color="success"
                onClick={() => navigate(`/exams`)}
              >
                <Icon>checkmark</Icon>&nbsp;&nbsp;&nbsp;Done
              </MDButton>
            ) : exam.inProgress === true ? (
              <MDButton
                variant="contained"
                color="info"
                onClick={() => navigate(`/exams/begin/${exam.id}`)}
              >
                <Icon>create</Icon>&nbsp;&nbsp;&nbsp;Continue
              </MDButton>
            ) 
            :  (
              
              button
            )}
          </MDBox>
        ),
        Remaining :
        (
          <MDTypography display="block" variant="h6" fontWeight="regular">
          {dd[index]} Days {hours[index]}:{minutes[index]}:{seconds[index]}
          </MDTypography>
        ),
        
      };
      
    });

  return (
   
    <div>
      {props.exams.length > 0 ? (
        <MDBox>
           <NotificationContainer/>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
        </MDBox>
      ) : (
        <MDBox mx={3} mb={3}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            No exams available!
          </MDTypography>
        </MDBox>
      )}
    </div>
  );
}
