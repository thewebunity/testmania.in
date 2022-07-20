import React from "react";
import { Container, Row, Col } from "reactstrap";

import courseImg01 from "../../assets/images/web-development.png";
import courseImg02 from "../../assets/images/kids-learning.png";
import courseImg03 from "../../assets/images/seo.png";
import courseImg04 from "../../assets/images/ui-ux.png";
import FreeCourseCard from "./FreeCourseCard";
import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

import "./free-course.css";

import {
  getLastExams,
 
} from "../../store/exams-slice";


const FreeCourse = () => {
  const dispatch = useDispatch();

  const [dataf, setData] = useState();

  useEffect(() => {
    const getData = async () => {
    const data =  await dispatch(getLastExams());
    
    setData(data);
    
    };

    getData();

    

    return () => {
     
      
    };
  }, []);

  if(dataf){
    return (
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="fw-bold">Recent exams</h2>
            </Col>
  
            {dataf.map((item) => (
              <Col lg="3" md="4" className="mb-4" key={item.id}>
                <FreeCourseCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  }else{
    return (
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="fw-bold">Our Free Courses</h2>
            </Col>
  
            
          </Row>
        </Container>
      </section>
    );
  }
  

};

export default FreeCourse;
