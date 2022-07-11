import React from "react";
import './Twofa.css';
import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";

function TwofaEnable(props) {
    var value = props.value;
    var secret = props.secret;
    var [searchParams] = useSearchParams();
    var error = searchParams.get("error");

    return(
        <div className="twofa">
            <h1 className="setup">Set Up 2 Factor Auth</h1>
            {value && <QRCode value={value} />}
            <p className="scan">Scan QR or Manually Enter Secret in Your 2FA App</p>
            {secret && <p className="scan">Secret: {secret}</p>}
            <form action="/enable" method="POST">
                <input type="text" name="twofa" placeholder="Enter 2 Factor Code"></input>
                <button type="submit">Enable 2FA</button>
                {error ? <p>Error Enabling 2FA</p> : null}
            </form>
        </div>
    );
}

export default TwofaEnable;