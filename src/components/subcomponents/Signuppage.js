import React from "react";
import './Signup.css';

function Signuppage() {
    const [copyState, setCopyState] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function generate(e) {
        setCopyState(false);
        setErrorMessage(false);
        e.preventDefault();
        var username = generateString(10);
        document.getElementById("username").value = username;
    }

    function copy(e) {
        e.preventDefault();
        var copyText = document.getElementById("username");

        if(copyText.value.length) {
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
            navigator.clipboard.writeText(copyText.value);
            setCopyState(true);
        } else {
            setErrorMessage(true);
            setCopyState(false);
        }
    }

    return(
        <div className="signuppage">
            <form>
                <input type="text" name="username" placeholder="Username" className="username" id="username"></input>
                <br></br>
                <button onClick={copy} className="copy">Copy Username</button>
                { copyState ? <p className="copyName">Username Copied to Clipboard</p> : null }
                { errorMessage ? <p className="copyName">Please Generate a Username</p> : null }
                { copyState || errorMessage ? null : <br></br> }
                <button onClick={generate}>Generate Username</button>
                <br></br>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
}

export default Signuppage;