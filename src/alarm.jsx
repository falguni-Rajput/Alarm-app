import React, { useRef, useEffect, useState } from 'react';
import nightImg from "./assets/night2.avif";
import "./alarm.css";
import audio from "./assets/birds-singing-audio-tune-165801.mp3";

function Alarm() {
  const input = useRef();
  const alarmAudio = useRef(new Audio(audio));  // only once banega
  const [alarmTime, setAlarmTime] = useState("");

  // Page load pe localStorage se fetch
  useEffect(() => {
    const savedTime = localStorage.getItem("alarmTime");
    if (savedTime) {
      setAlarmTime(savedTime);
    }
  }, []);

  const handleButton = () => {
    const time = input.current.value;
    if (!time) return;
    setAlarmTime(time);                 // H1 me show
    localStorage.setItem("alarmTime", time);  // save
    input.current.value = "";
  };
useEffect(() => {
  const interval = setInterval(() => {
    const savedTime = localStorage.getItem("alarmTime");
    if (!savedTime) return;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    if (currentTime === savedTime) {
      const audioEl = alarmAudio.current;
      audioEl.loop = true;
      audioEl.play();

      // Thoda delay do taaki play start ho jaye
      setTimeout(() => {
        alert("Wakeup buddy! Your alarm time is done!");
        // OK dabane ke baad band karo
        audioEl.pause();
        audioEl.currentTime = 0;

        // ✅ Alarm reset
        localStorage.removeItem("alarmTime");
        setAlarmTime(""); 
      }, 500);
    }
  }, 1000);

  return () => clearInterval(interval); // cleanup
}, []);

  
  return (
    <div className='container-alarm'>
      <img className='night' src={nightImg} alt="Night vibe" />
      <div className='setalarm'>
        <label>Set Alarm:</label>
        <input ref={input} type='time' />
        <button onClick={handleButton}>Confirm</button>
        <div className='textcard'>
          <h1>Your alarm time is: {alarmTime || "Not set"}</h1>
        </div>
      </div>
    </div>
  );
}
export default Alarm;
