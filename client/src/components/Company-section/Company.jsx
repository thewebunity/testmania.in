import React from "react";
import { Container, Row, Col } from "reactstrap";
import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{faAnglesRight} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";


// Hooks
import useFormInput from "hooks/form-input";



// Store
import { getPage } from "store/page-slice";


const Company = () => {

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
      const data = await dispatch(getPage('Annoucement'));

      if (data && data.page) {
        htmlSetValue(data.page.html);
        cssSetValue(data.page.css);

     
      }

      setIsLoading(false);
    };

    getData();
  }, []);
  function createMarkupHtml() {
    return {__html: html};
  }



  return (
 
    <section className="f">
   

          <marquee>


            <span  style={{color:"white"}}> <FontAwesomeIcon icon={faAnglesRight} />
            <style dangerouslySetInnerHTML={{__html:css.replace(/\\n/g, '')}}/>
    <span dangerouslySetInnerHTML={createMarkupHtml()} />
 </span>            </marquee>
      
   
  
  </section>
  );
};

export default Company;
