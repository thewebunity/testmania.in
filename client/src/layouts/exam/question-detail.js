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

// react
import { useEffect, useState } from "react";

// react redux
import { useDispatch } from "react-redux";

// react router
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

function QuestionDetail({ question, onChange, index }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={2}
      mt={1}
      sx={{
        boxShadow: `0 1rem 2rem ${
          darkMode ? "transparent" : "rgba(0, 0, 0, 0.1)"
        }`,
      }}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "flex-start" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={1}
        >
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "flex-start", sm: "flex-start" }}
            mb={1}
          >
            <MDTypography
              variant="body1"
              fontWeight="regular"
              textTransform="none"
              mb={1}
            >
              {`${index + 1}.  ${question.question}`}
            </MDTypography>
            <MDTypography
              variant="body2"
              fontWeight="light"
              textTransform="none"
              color="secondary"
            >
              {`${question.description ? `(${question.description})` : ""}`}
            </MDTypography>
          </MDBox>
        </MDBox>

        {question.imageUrl && (
          <MDBox mb={1} lineHeight={0} display="flex" flexDirection="column">
            <img src={question.imageUrl} alt={question.question} width="100%" />
          </MDBox>
        )}

        <MDBox mb={4} lineHeight={0} display="flex" flexDirection="column">
          <RadioGroup
            aria-labelledby="radio-group"
            name="options"
            value={question.selectedAnswer || ""}
            onChange={handleChange}
          >
            {question.options.map((val, index) => (
              <MDBox key={index}>
                <MDTypography variant="body1">
                  <MDTypography
                    variant="caption"
                    color="text"
                    display="inline-block"
                  >
                    <Radio
                      onChange={handleChange}
                      value={val}
                      sx={{ marginBottom: `.2rem`, marginRight: `.5rem` }}
                    ></Radio>
                  </MDTypography>
                  {val}
                </MDTypography>
              </MDBox>
            ))}
          </RadioGroup>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default QuestionDetail;
