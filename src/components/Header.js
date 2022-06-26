import React from "react";
import er from './img/er.png';
import cape from './img/logo.gif';
import './css/Starting.css';

function Header() {
    return (
        <div className='head-row'>
            <img src={er} className="head-logo" alt='Zanonious Logo'></img>
            <h1 className='heading'>COLLEGE OF ENGINEERING, PERUMON</h1>
            <img src={cape} className="cape-logo" alt='Cape Logo'></img>
        </div>
    );
}

export default Header;