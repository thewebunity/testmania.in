import React from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg1 from "../../assets/images/laptop.png";
import courseImg2 from "../../assets/images/infogrpahic.png";
import courseImg3 from "../../assets/images/jjj.jpg";
import "./courses.css";
import CourseCard from "./CourseCard";
import course from "../../assets/images/infographic.png";
import arrow from "../../assets/images/arrow.png";

const coursesData = [
  {
    id: "01",
    title: "Web Design BootCamp-2022 for Beginners",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg1,
  },

  {
    id: "02",
    title: "Professional Graphics Design, PhotoShop, Adobe XD, Figma",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg2,
  },

  {
    id: "03",
    title: "UI/UX BootCamp for Beginners in 2022",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg3,
  },
];

const Courses = () => {
  return (
    <section>
      <Container>
        <Row>
        <section className="works">
  <div className="container">
    <div className="row">
      <div className="title" style={{fontWeight: 'bold'}}>How IT WORKS?</div>
    </div>
    <div className="row">
      <div className="col-12 col-xs-6 col-sm-6 col-md-3">
        <div className="circle_icon">
          <div className="circleshvr">
            <div className="que_database sprite3">
              <img src={course} style={{}} alt="TestMania Online Examination" />
            </div>
          </div>
          <div className="hw_wrk_text left_space">Step 1 </div>
          <img src={arrow} alt="TestMania Online Examination" className="arrow" />
        </div>
      </div>
      <div className="col-12 col-xs-6 col-sm-6 col-md-3 text-left">
        <div className="circle_icon pl-4">
          <div className="circleshvr"><div className="tst_dsgn sprite3">
              <img src={courseImg3} style={{}} alt="TestMania Online Examination" />
            </div></div>
          <div className="hw_wrk_text left_space">Step 2 </div>
          <img src={arrow}  alt="TestMania Online Examination" className="arrow_second" />
        </div>
      </div>
      <div className="col-12 col-xs-6 col-sm-6 col-md-3 text-center">
        <div className="circle_icon">
          <div className="circleshvr"> <div className="tst_assgn sprite3">
              <img src={courseImg2} style={{}} alt="TestMania Online Examination" />
            </div></div>
          <div className="hw_wrk_text">Step 3</div>
          <img src={arrow} alt="TestMania Online Examination" className="arrow_second" />
        </div>
      </div>
      <div className="col-12 col-xs-6 col-sm-6 col-md-3 text-left" style={{paddingLeft:'50px'}}>
        <div className="circle_icon pl-4">
          <div className="circleshvr"><div className="tst_dsgn sprite3">
              <img src={courseImg1}style={{}} alt="TestMania Online Examination" />
            </div></div>
          <div className="hw_wrk_text left_space">Step 4 </div>
      
        </div>
      </div>
      
    </div>
  </div>
</section>

        </Row>
      </Container>
    </section>
  );
};

export default Courses;
