
import React from "react";
import "./contactus.css";
import { useState, useEffect } from "react";

// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";
import bui from "../../assets/images/bulding.png";
import loc from "../../assets/images/location-pin.png";
import mail from "../../assets/images/mail.png";



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
import useFormInput from "hooks/form-input";

import Header from "../Header/Header";


import Footer from "../Footer/Footer";


import { ms } from "date-fns/locale";

import {sendEmail} from "../../store/students-slice";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';











const ContactUs = () => {

    const {
        value: name,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        hasError: nameHasError,
        resetinput: resetname,
      } = useFormInput((value) => value.trim() !== "");


    const {
        value: subject,
        inputChangeHandler: subjectChangeHandler,
        inputBlurHandler: subjectBlurHandler,
        hasError: subjectHasError,
        resetinput: resetsubject,
      } = useFormInput((value) => value.trim() !== "");
    
      const {
        value: email,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        hasError: emailHasError,
        resetinput: resetemail,
      } = useFormInput((value) => value.trim() !== "");  

      const {
        value: phone,
        inputChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
        hasError: phoneHasError,
        resetinput: resetphone,
      } = useFormInput((value) => value.trim() !== "");

      const {
        value: msg,
        inputChangeHandler: msgChangeHandler,
        inputBlurHandler: msgBlurHandler,
        hasError: msgHasError,
        resetinput: resetmsg,
      } = useFormInput((value) => value.trim() !== "");



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
      
    }, []);
    function createMarkup() {
      return {__html: html};
    }
  
  
   const createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('Info message');
              break;
            case 'success':
              NotificationManager.success('Success message', 'Title here');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };
    const navigate = useNavigate();

    const formSubmitHandler = async (event) => {
        event.preventDefault();  

        const res = await dispatch(
            sendEmail({
                email,
                phone,
                subject,
                
                msg,
                name,
              
            })
          );
       
          if (res === true) {
          
            
            NotificationManager.success('Email Sent Thank you ','',3000,() => {
                alert('callback');
              });
          
                const interval = setInterval(() => {
                    NotificationManager.success('Will be redirecting to Home ','',3000);
                    setInterval(() => {
                        navigate('/home');
                    }, 3000);
                    return () => clearInterval(interval);
                }, 3000);
                return () => clearInterval(interval , );
                
           
            
           
          }else{
            NotificationManager.warning('Error',  3000);
          }
        


      };

      

    return (
        <><><Header /><div>
            <title>Contact Us </title>
            <div className="maids mader_dis">
                <div className="inner_headingtext contact_us" style={{ backgroundImage: 'url("https://testmania.in/public/img/math.gif")' }}>
                    <div className="container">
                        <div className="inner_heading"><span>Contact Us</span></div>
                    </div>
                </div>
                <link rel="stylesheet" type="text/css" href="path/to/notifications.css" />
                <div className="container">
                    <div className="maids">
                        <div className="clr" />
                        <div className="middel_con">
                            <div className="con_tu">
                                <div className="cont_ac">
                                    <div className="contact_wrap">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="rig_con">
                                                    <h3 className="fancy-title">
                                                        <span>Send us a Message</span>
                                                    </h3>
                                                    <div className="cgtr">
                                                        <form onSubmit={formSubmitHandler} acceptCharset="UTF-8" id="contact" className="cssForm" encType="multipart/form-data"><input name="_token" type="hidden" defaultValue="ikEWwWZcBc5hBFwvq1Pco7epWI7CCappsUMkbbdr" />
                                                            <div className="ersu_message" />
                                                            <div className="left_wrap">
                                                                <div className="oned">
                                                                    <div className="input_box_register">
                                                                        <input className="form-control required validname" placeholder="Name*" autoComplete="off" value={name} onChange={nameChangeHandler} onBlur={nameBlurHandler} type="text" /> {nameHasError && (
                  <MDTypography variant="caption" color="error">
                    Name is required!
                  </MDTypography>
                )}
                                                                    </div>
                                                                </div>
                                                                <div className="oned">
                                                                    <div className="input_box_register">
                                                                        <input className="form-control required" placeholder="Subject*" autoComplete="off" name="subject" type="text" value={subject} onChange={subjectChangeHandler} onBlur={subjectBlurHandler} />
                                                                    </div>
                                                                </div>
                                                                <div className="oned">
                                                                    <div className="input_box_register special">
                                                                        <input className="form-control required email" placeholder="Email Address*" autoComplete="off" name="email_address" type="text"  value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                                                                    </div>
                                                                </div>
                                                                <div className="oned">
                                                                    <div className="input_box_register special">
                                                                        <input className="form-control required digits" placeholder="Phone Number*" minLength={10} autoComplete="off" name="contact" type="text" value={phone} onChange={phoneChangeHandler} onBlur={phoneBlurHandler} />
                                                                    </div>
                                                                </div>
                                                                <div className="input_box_register reg_textare">
                                                                    <textarea className="form-control required" placeholder="Message*" autoComplete="off" rows={4} name="message" cols={50} defaultValue={""}  value={msg} onChange={msgChangeHandler} onBlur={msgBlurHandler}/>
                                                                </div>
                                                                <div className="loing_dv">
                                                                    <div className="login_boxes0">
                                                                        <div className="input_box">
                                                                            <input className="btn btn-info" type="submit" id="submit" value="Submit" />
                                                                            <label>&nbsp;</label>
                                                                        </div>
                                                                       
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="con_left">
                                                    <h3 className="fancy-title">
                                                        <span>Office Info</span>
                                                    </h3>
                                                    <div className="inputs">
                                                        <div className="copmanys copmanys1">
                                                            <small><img src={bui} alt="TestMania Online Examination" /></small>
                                                            <div className="metios metios1">
                                                                <b>
                                                                    eBiz Solutions                                                      </b>
                                                            </div>
                                                        </div>
                                                        <div className="copmanys copmanys2">
                                                            <small><img src={loc} alt="TestMania Online Examination" /></small>
                                                            <div className="metios metios2">
                                                                <b>
                                                                    508, New Jagamara,
                                                                    Khandagiri, Bhubaneswar                                                          </b>
                                                            </div>
                                                        </div>
                                                        <div className="copmanys copmanys4">
                                                            <small><img src={mail} alt="TestMania Online Examination" /></small>
                                                            <div className="metios  metios4">
                                                                <b>
                                                                    info@testmania.in                                                          </b>
                                                            </div>
                                                        </div>
                                                        <span className="cont"> </span>
                                                    </div>
                                                </div>
                                                <div className="con_le">
                                                    <div className="img_bdr_new_neww">
                                                        <div className="img_org_new">
                                                            <div id="map" style={{ width: '100%', height: '293px' }}>
                                                                <div id="map-canvas" style={{ width: '100%', height: '100%' }}>
                                                                    <iframe src="https://maps.google.it/maps?q=508, New Jagamara,Khandagiri, Bhubaneswar&output=embed" width="100%" height="100%" style={{ border: '0px' }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clr" />
                                </div>
                            </div>
                        </div>
                        <div className="clr" />
                    </div>
                </div>
            </div>
            <NotificationContainer/>
        </div></><Footer /></>

    );
  };

  export default ContactUs;