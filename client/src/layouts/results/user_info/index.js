import React from "react";

// react router
import { useNavigate } from "react-router-dom";


// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import Icon from "@mui/material/Icon";



// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// Soft UI Dashboard Materail-UI example components
import DataTable from "examples/Tables/DataTable";

let columns, rows;
let examId;
let a;

export default function User_info() {

const navigate = useNavigate();



  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  
  

  columns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "subject", accessor: "subject", align: "left" },
    { Header: "Start Date", accessor: "startDate", align: "left" },
    { Header: "duration", accessor: "duration", align: "left" },
    { Header: "marks", accessor: "marks", align: "left" },
   
    
  ];


  rows = {
        
        name: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
        ok
          </MDTypography>
        ),
        subject: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
        ok
          </MDTypography>
        ),
        startDate: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
          ok
          </MDTypography>
        ),
        duration: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
         ok
          </MDTypography>
        ),
        marks: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
           ok
          </MDTypography>
        ),
    
        
      };
      
   

  return (
   
    <div>
    
        <MDBox>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
        </MDBox>
  
    </div>
  );
}
