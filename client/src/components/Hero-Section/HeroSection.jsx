import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assets/images/hero-img1.png";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          
          <Col lg="6" md="6">
          <br/>  <br/>  
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
              Your ultimate destination
 <br />for online assessment <br />
 We Work Hard
              </h2>
             <p className="mb-5">

             
           

              </p>
            </div>
           
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
