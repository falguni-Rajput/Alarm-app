import React from 'react';
import "./nav.css";
import nightImg from "./assets/night2.avif";

function Nav() {
  return (
    <div className='navstyle'>
      <img className='night-img' src={nightImg} alt="Night vibe" />
      <h1>Wakeup Buddy</h1>
    </div>
  );
}

export default Nav;
