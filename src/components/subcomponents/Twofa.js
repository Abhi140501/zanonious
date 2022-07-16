import React from "react";
import './Twofa.css';
import { useSearchParams } from "react-router-dom";
import TwofaEnable from "./TwofaEnable";
import TwofaVerify from "./TwofaVerify";

function Twofa() {
    var [value, setValue] = React.useState();
    var [secret, setSecret] = React.useState();
    var [searchParams] = useSearchParams();
    var verify = searchParams.get("verify");
    fetch('/username').then(res => {
        return res.json();
    }).then(username => {
        if(username[0].username) {
            if(username[0].twofa && !verify) {
                window.location.replace('/dashboard');
            } else {
                setValue("otpauth://totp/Zanonious:" + username[0].username + "?secret=" + username[0].secret);
                setSecret(username[0].secret);
            }
        } else {
            window.location.replace('/');
        }
    });

    return(
        <div className="twofa">
            {verify ? <TwofaVerify /> : <TwofaEnable value={value} secret={secret} />}
        </div>
    ); 
}

export default Twofa;