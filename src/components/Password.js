import React from "react";
import './css/Password.css';
import encryptionPassword from '../App';

function Password() {
    const [login, setLogin] = React.useState(false);

    return(
        <div className="password">
            <div className="row">
                <form action="/setPassword" method="POST">
                    <input type="password" name="password" className="password-field" id="password" placeholder="Enter Encryption Password"></input>
                    <br></br>
                    {login ? <p className="error">Error Setting Password!<br></br>Please Check Your Password!</p> : null}
                    <button type="submit">Set Encryption Password</button>
                </form>
            </div>
        </div>
    );
}

export default Password;