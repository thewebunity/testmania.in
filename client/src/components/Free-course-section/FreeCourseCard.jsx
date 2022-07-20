import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{faBookmark} from "@fortawesome/free-solid-svg-icons";
import{faClock} from "@fortawesome/free-solid-svg-icons";

import courseImg01 from "../../assets/images/web-development.png";
const FreeCourseCard = (props) => {
  const { imgUrl, title, marks, duration } = props.item;

  
  return (
    <div className="single__free__course">
      <div className="free__course__img mb-5">
        <img src={courseImg01} alt="" className="w-100" />
     
      </div>

      <div className="free__course__details">
        <h6>{title}</h6>

        <div className=" d-flex align-items-center gap-5">
          <span className=" d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faBookmark} />{marks} Points
      
          </span>

          <span className=" d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faClock} /> {duration}min
          </span>
        </div>
      </div>
    </div>
  );
};

export default FreeCourseCard;
