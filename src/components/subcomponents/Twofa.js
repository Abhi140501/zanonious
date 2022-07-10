import React from "react";
import './Twofa.css';

function Twofa() {
    fetch('/username').then(res => {
        return res.json();
    }).then(username => {
        if(username[0].username) {
            var value = "otpauth://totp/zanonious:" + username[0].username + "?secret=" + username[0].secret;
            console.log(value);
        } else {
            window.location.replace('/');
        }
    });

    return(
        <div className="twofa">
            <h1 className="setup">Set Up 2 Factor Auth</h1>

        </div>
    ); 
}

export default Twofa;