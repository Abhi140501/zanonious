import React from "react";
import './css/Login.css';
import Loginpage from "./subcomponents/Loginpage";
import Signuppage from "./subcomponents/Signuppage";

function Login() {
    const [LoginState, setLoginState] = React.useState(true);

    function changeDisplayLogin() {
        document.getElementById("login").style.color = "black";
        document.getElementById("login").style.borderBottom = "2px solid black";
        document.getElementById("signup").style.color = "rgb(78, 78, 78)";
        document.getElementById("signup").style.borderBottom = "1px solid grey";
        setLoginState(true);
    }

    function changeDisplaySignup() {
        document.getElementById("signup").style.color = "black";
        document.getElementById("signup").style.borderBottom = "2px solid black";
        document.getElementById("login").style.color = "rgb(78, 78, 78)";
        document.getElementById("login").style.borderBottom = "1px solid grey";
        setLoginState(false);
    }

    return(
        <div className="login">
            <div className="row">
                <button className="button1" id="login" onClick={changeDisplayLogin}>Login</button>
                <button className="button2" id="signup" onClick={changeDisplaySignup}>SignUp</button>
                { LoginState ?  <Loginpage /> : <Signuppage />}
            </div>
        </div>
    );
}

export default Login;