import React, { useRef, useEffect, useState } from 'react';
import "./clock.css";

import nightImg from "./assets/night2.avif";

function Clock() {
  const hourRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();
  const [digitalTime, setDigitalTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // Rotate hands
      if (hourRef.current)
        hourRef.current.style.transform = `translate(-50%, -100%) rotate(${hours * 30 + minutes * 0.5}deg)`;
      if (minuteRef.current)
        minuteRef.current.style.transform = `translate(-50%, -100%) rotate(${minutes * 6}deg)`;
      if (secondRef.current)
        secondRef.current.style.transform = `translate(-50%, -100%) rotate(${seconds * 6}deg)`;

      // Update digital time
      setDigitalTime(
        `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
      );
    };

    updateClock(); // initialize immediately
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className='clock-container'>
      {/* Background Image */}
      <img className='night-img' src={nightImg} alt="Night vibe" />

      {/* Clock Wrapper */}
      <div className='clock-wrapper'>
        <div className='clock'>
          <div ref={hourRef} className='right-hands'></div>
          <div ref={minuteRef} className='left-hands'></div>
          <div ref={secondRef} className='second-hand'></div>
          <div className='dot'></div>
        </div>
      </div>

      {/* Digital time */}
      <div className="digital-time">{digitalTime}</div>

      
    </div>
  );
}

export default Clock;
