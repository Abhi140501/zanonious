import React from "react";
import './Twofa.css';
import { useSearchParams } from "react-router-dom";


function TwofaVerify() {
    var [searchParams] = useSearchParams();
    var verifyError = searchParams.get("verifyError");

    return (
        <div className="Twofa">
            <h1>Verify 2FA</h1>
            <form action="/verify" method="POST">
                <input type="text" name="twofa" id="twofa" placeholder="Enter 2FA Code"></input>
                <br></br>
                {verifyError ? <p>2FA Code Error</p> : null}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default TwofaVerify;