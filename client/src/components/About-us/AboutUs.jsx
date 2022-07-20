import React from "react";
import "./about.css";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assets/images/about-us.png";
import CountUp from "react-countup";
import "./about.css";
// react
import { useState, useEffect } from "react";

// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


// Hooks
import useFormInput from "hooks/form-input";



// Store
import { getPage } from "store/page-slice";


const AboutUs = () => {



  const {
    value: html,
    setValue: htmlSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: css,
    setValue: cssSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");






  const dispatch = useDispatch();

  const pagesSlice = useSelector((state) => state.students);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getPage('About-Us'));

      if (data && data.page) {
        htmlSetValue(data.page.html);
        cssSetValue(data.page.css);

     
      }

      setIsLoading(false);
    };

    getData();
  }, []);
  function createMarkup() {
    return {__html: html};
  }



  const navigate = useNavigate();
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>About Us</h2>
              <p>
              Testmania is international level talent assessment tool or platform for Indian students. It is an incomparable educational measurement and assessment service
              </p>
              <p>Testmania is a scientifically designed, skill-based assessment test to get the strengths and weaknesses of individual students.</p>
              <p>Testmania is designed to assess the overall intellectual potential of the students from class 8 to 12.</p>

          
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
