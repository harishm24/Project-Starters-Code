import React from "react";
import {NavLink,useLocation} from "react-router-dom";
import "../CSS/ProgressSteps.css";

const ProgressButtons=({to,text})=>{
    const location=useLocation();
    return(
        <NavLink to={to}
         className={`progess-button ${
            location.pathname===to ? "active-button":""}`}>
            {text}
       
        </NavLink>
    );
};

const ProgressSteps = () => {
    const progressButtons=[
        { to:"/profile",text:"My Profile"},
        { to:"/user/booking",text:"My Bookings"},
        { to:"/accomodation",text:"My Accomodations"},

    ];
  return (
  <div className="checkout-progress d-flex justify-content-center mt-5">
  {progressButtons.map(({to,text},index)=>(
    <ProgressButtons key={index} to={to} text={text}/>
  ))}
 
  </div>
  );
};

export default ProgressSteps;