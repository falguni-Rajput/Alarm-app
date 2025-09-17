import React, { useRef, useState,useEffect } from 'react';
import alarm from "./assets/night2.avif";
import "./mid.css";

function Mid() {
const Text = useRef();
const heading = useRef();
const button = useRef()
const[current,setcurrent] = useState("");

const event = (e) => {
  e.preventDefault();
  const value = Text.current.value;
  setcurrent(value);              // state update
  localStorage.setItem("alarmText", value); // localStorage me save
  Text.current.value = "";
};
useEffect(() => {
  const saved = localStorage.getItem("alarmText");
  if (saved) setcurrent(saved); // agar kuch saved hai to state me set karo
}, []);

  return (
    <div className="mid-container">
      <img className='alrmstyle' src={alarm} alt="Alarm"/>
      
      {/* Overlay heading */}
      <div className="overlay-text">
       
        <h1 ref={heading}>
  {current || "Never miss a moment – set your alarms and stay on track!"}
</h1>

      </div>
      <div className="overlay-Input">
        <input  ref={Text}    type='text' placeholder='write here........'></input>
        <button  onClick={event} ref={button}>submit</button>
      </div>
    
    </div>
  );
}

export default Mid;
