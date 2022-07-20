import React, { useRef } from "react";
import { Container } from "reactstrap";
import img from "../../assets/images/logo.png";
import "./header.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { logout } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import NotificationItem from "examples/Items/NotificationItem";
import Icon from "@mui/material/Icon";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const auth = getAuth();






const Header = () => {
  const dispatchActions = useDispatch();

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

  const navLinks = [
    {
      display: "Home",
      url: "/home",
    },
    {
      display: "AboutUs",
      url: "/about",
    },
    {
      display: "ContactUs",
      url: "/contactUs",
    },
  
 
  ];
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const authStatus = useSelector((state) => state.auth);
  if(!authStatus.currentUser){
    navLinks.push({
      display: "Login",
      url: "/sign-in",
    });
  }
    else{
      navLinks.push({
        display: "Dashbord",
        url: "/",
      },
      );
      var l=[
        <NotificationItem
        icon={<Icon>logout</Icon>}
        title="Logout"
        onClick={() => dispatchActions(logout())}
      />
      ]
    }
   
   
    
    const navigate = useNavigate();



  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className=" d-flex align-items-center gap-1">
            
              <img src={url.link}  onClick={() => { navigate('/home') }}  />
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list" >
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a   style={{color: 'black', fontFamily:'sans-serif'}} href={item.url} >{item.display}</a>
                  </li>
                ))}
                {l}
             
                
              </ul>
            </div>

        
          </div>

          <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};



export default Header;
