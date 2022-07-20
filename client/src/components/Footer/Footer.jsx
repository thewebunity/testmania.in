import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "./footer.css";
import img from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// react-router-dom components
import {  useParams } from "react-router-dom";

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
import { getFooter } from "store/footer-slice";

const footerQuickLinks = [

  {
    display: "About-Us",
    url: "/content/About-Us",
  },

  {
    display: "How It Works",
    url: "/content/How It Works",
  },
  {
    display: "FAQs",
    url: "/content/FAQs",
  },

  {
    display: "Privacy Policy",
    url: "/content/Privacy Policy",
  },
 
  {
    display: "Terms & Conditions - Refund Policy",
    url: "/content/Terms & Conditions - Refund Policy",
  },
];

const footerInfoLinks = [

  
  {
    display: "Awards",
    url: "/content/Awards",
  },
 

  {
    display: "Affiliates",
    url: "/content/Affiliates",
  },
  {
    display: "Disclaimer",
    url: "/content/Disclaimer",
  },
  {
    display: "Test Calendar",
    url: "/content/Test Calendar",
  },
  
];

const Footer = () => {

  const [url, seturl] = useState(
    {
  
        url: '',
    }
  );
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/pages/logo`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
       
          seturl({...url, link: `${process.env.REACT_APP_IMAGE_CLOUD}/public/uploads/${result.logo.src}`});
        
        },
     
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  const {
    value: address,
    setValue: addressSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");
  
  const {
    value: phone,
    setValue: phoneSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: email,
    setValue: emailSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");
  const {
    value: fb,
    setValue: fbSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");
  const {
    value: inst,
    setValue: instSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");
  const {
    value: twiter,
    setValue: twiterSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");
  const {
    value: google,
    setValue: googleSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");
  const {
    value: linkedin,
    setValue: linkedinSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");
  const {
    value: youtube,
    setValue: youtubeSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");

  




  const dispatch = useDispatch();

  const pagesSlice = useSelector((state) => state.students);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getFooter());
console.log("data::::",data)
      if (data && data.footer) {
        
        addressSetValue(data.footer[0].address);
        phoneSetValue(data.footer[0].phone);
        emailSetValue(data.footer[0].email);
        fbSetValue(data.footer[0].fb);
        instSetValue(data.footer[0].inst);
        twiterSetValue(data.footer[0].twiter);
        googleSetValue(data.footer[0].google);
        linkedinSetValue(data.footer[0].linkedin);
        youtubeSetValue(data.footer[0].youtube);

     
      }

      setIsLoading(false);
    };

    getData();
  }, []);
 



  const navigate = useNavigate();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <h2 className=" d-flex align-items-center gap-1">
             <img src={url.link}  onClick={() => { navigate('/home') }}/>
            </h2>

            <div className="follows">
              <p className="mb-0">Follow us on social media</p>
              <span>
                {" "}
                <a href={fb}>
                  <i class="ri-facebook-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href={inst}>
                  <i class="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href={linkedin}>
                  <i class="ri-linkedin-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href={twiter}>
                  <i class="ri-twitter-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href={youtube}>
                  <i class="ri-youtube-line"></i>
                </a>
              </span>
              <span>
                {" "}
                <a href={google}>
                  <i class="ri-google-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-4">
     
            <ListGroup className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6" className="mb-4">
          
            <ListGroup className="link__list">
              {footerInfoLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6">
            <h6 className="fw-bold">Get in Touch</h6>

            <p>Address: {address}</p>
            <p> Phone: {phone} </p>
            <p>Email: {email}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
