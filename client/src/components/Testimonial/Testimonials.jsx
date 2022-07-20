import React from "react";
import "./testimonial.css";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";

import img from "../../assets/images/testimonial01.png";

import courseImg01 from "../../assets/images/web-development.png";
import courseImg02 from "../../assets/images/kids-learning.png";
import courseImg03 from "../../assets/images/seo.png";
import courseImg04 from "../../assets/images/education_graphic.png";

import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };
  return (
   
    <section>

    <section className="tag_line">
<div className="container">
  <div className="row">
    <div className="col-12 col-xs-12 col-sm-6 col-md-6">
      <div className="demo_text">
        <ul>
          <li><FontAwesomeIcon icon={faAngleRight} /> Easy to Learn and Use</li>   
          <li><FontAwesomeIcon icon={faAngleRight} /> Highly Interactive Interface</li>   
          <li><FontAwesomeIcon icon={faAngleRight} /> Advanced Reporting System</li>   
          <li><FontAwesomeIcon icon={faAngleRight} /> Splendid Support</li>   
          <li><FontAwesomeIcon icon={faAngleRight} /> Smart Subscriptions</li>   
          <li><FontAwesomeIcon icon={faAngleRight} /> Active Accessibility</li>   
        </ul>
      </div>   
    </div>
    <div className="col-12 col-xs-12 col-sm-6 col-md-6">
      <img src={courseImg04} alt="TestMania Online Examination" />
    </div>
  </div> </div>
<div className="waveWrapper waveAnimation">
  <div className="bgTop">
    <div className="wave waveTop" style={{backgroundImage: 'url("https://testmania.in/public/img/wave-top.png")'}} />
  </div>
  <div className="bgMiddle">
    <div className="wave waveMiddle" style={{backgroundImage: 'url("https://testmania.in/public/img/wave-mid.png")'}} />
  </div>
  <div className="bgBottom">
    <div className="wave waveBottom" style={{backgroundImage: 'url("https://testmania.in/public/img/wave-bot.png")'}} /> 
  </div>
</div>
</section>

  </section>
  );
};

export default Testimonials;
