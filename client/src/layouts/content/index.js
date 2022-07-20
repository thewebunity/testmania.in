import React, { Fragment } from "react";
import Header from "../../components/Header/Header";

import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assets/images/about-us.png";
import CountUp from "react-countup";

// react
import { useState, useEffect } from "react";

// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";


// Hooks
import useFormInput from "hooks/form-input";
import Footer from "../../components/Footer/Footer";




// Store
import { getPage } from "store/page-slice";

 const Page = () => {


    const { id } = useParams();

  var {
    value: html,
    setValue: htmlSetValue,

  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: css,
    setValue: cssSetValue,

  } = useFormInput((value) => value && value?.toString() !== "");





  const dispatch = useDispatch();

  const pagesSlice = useSelector((state) => state.students);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getPage(id));

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
    <Fragment>
   <Header />
   <br/> <br/> 

   <div style={{float: 'left', textAlign: 'left', width: '100%', background: '#f7f7f7', borderBottom: '1px solid #efefef', position: 'relative'}} >
   <div class="container">
   <h1 style={{color: 'black', fontFamily: '"Trocchi", serif', fontSize: '45px', fontWeight: 'normal', lineHeight: '48px', margin: 0, }}>{id} </h1>
   </div> 
   </div>
 
   <div class="container">
       
        
    <style dangerouslySetInnerHTML={{__html:css.replace(/\\n/g, '')}}/>
    <section dangerouslySetInnerHTML={createMarkupHtml()} />
   </div>
    
  
    
    <Footer />

  </Fragment>
  );
};

export default Page;
