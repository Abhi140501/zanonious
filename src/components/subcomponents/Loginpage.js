import React from "react";
import './Login.css';
import { useSearchParams } from "react-router-dom";

function Loginpage() {
    var [searchParams] = useSearchParams();
    var login = searchParams.get("login");

    fetch('/username').then(res => {
        return res.json();
    }).then(username => {
        if(username[0].username) {
            if(username[0].twofa) {
                window.location.replace('/dashboard');
            } else {
                window.location.replace('/2fa');
            }
        }
    });

    return(
        <div className="loginpage">
            <form action="/login" method="POST">
                <input type="text" name="username" className="username" id="username" placeholder="Username"></input>
                <br></br>
                {login ? <p className="error">Error Logging In!<br></br>Please Check Your Username!</p> : null}
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default Loginpage;