import React from "react";
import './Signup.css';
import copy from './img/copy.png';

function Signuppage() {
    function generate(e) {
        e.preventDefault();
    }

    return(
        <div className="signuppage">
            <form>
                <input type="text" name="username" placeholder="Username" className="username"></input>
                <input type="image" src={copy} alt="copy button" className="copy"></input>
                <br></br>
                <button onClick={generate}>Generate Username</button>
                <br></br>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
}

export default Signuppage;