import React from "react";
import './css/Password.css';
import { useSearchParams } from "react-router-dom";

function Password() {
    var [searchParams] = useSearchParams();
    var login = searchParams.get("error");

    return(
        <div className="password">
            <div className="row">
                <form action="/setPassword" method="POST">
                    <input type="password" name="password" className="password-field" id="password" placeholder="Enter Encryption Password"></input>
                    <br></br>
                    {login ? <p className="error">Error Decrypting Data!<br></br>Please Check Your Password!</p> : null}
                    <button type="submit">Set Encryption Password</button>
                </form>
            </div>
        </div>
    );
}

export default Password;