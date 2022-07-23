import React from "react";
import Files from "./subcomponents/Files";
import './css/Dashboard.css';
import logo from './img/er.png';
import hamburger from './img/burger.png';
import Shared from "./subcomponents/Shared";
import Received from "./subcomponents/Received";
import { useSearchParams } from "react-router-dom";

function Dashboard() {
    const [filesView, setFilesView] = React.useState(true);
    const [sharedView, setSharedView] = React.useState(false);
    const [receivedView, setReceivedView] = React.useState(false);
    var [searchParams] = useSearchParams();
    var error = searchParams.get("error");

    fetch('/username').then(res => {
        return res.json();
    }).then(username => {
        if(username[0].username) {
            if(!username[0].twofa) {
                window.location.replace('/2fa');
            } else if(!username[0].verify) {
                window.location.replace('/2fa?verify=true');
            } else if(username[0].verify !== username[0].username) {
                window.location.replace('/2fa?verify=true');
            }
        } else {
            window.location.replace('/');
        }
    });

    fetch('/password').then(res => {
        return res.json();
    }).then(password => {
        if(!password[0].password) {
            window.location.replace('/password');
        }
    });

    function changeIcon() {
        if(document.getElementById("iconSidebar").style.display === "none") {
            document.getElementById("sidebar").style.display = "none";
            document.getElementById("iconSidebar").style.display = "block";
            document.getElementById("rightofbar").style.width = "94%";
        } else {
            document.getElementById("sidebar").style.display = "block";
            document.getElementById("iconSidebar").style.display = "none";
            document.getElementById("rightofbar").style.width = "79%";
        }
    }

    function setFiles() {
        setFilesView(true);
        setSharedView(false);
        setReceivedView(false);
    }
    
    function setShare() {
        setFilesView(false);
        setSharedView(true);
        setReceivedView(false);
    }

    function setReceived() {
        setFilesView(false);
        setSharedView(false);
        setReceivedView(true);
    }

    return(
        <div className="Dashboard">
            <div className="titlebar">
                <img src={hamburger} alt="hamburger menu" className="hamburger" onClick={changeIcon}></img>
                <img src={logo} alt="zanonious logo" className="logo"></img>
                <form action="/logout" method="POST" className="logout">
                    <button type="submit" className="logoutButton">Encrypt and Logout</button>
                </form>
            </div>
            <div className="content">
                <div className="sidebar" id="sidebar">
                    <ul>
                        <li className="switchTab" onClick={setFiles}>Uploaded</li>
                        <li className="switchTab" onClick={setShare}>Shared</li>
                        <li className="switchTab" onClick={setReceived}>Received</li>
                    </ul>
                </div>
                <div className="iconSidebar" id="iconSidebar">
                    <ul>
                        <li>U</li>
                        <li>S</li>
                        <li>R</li>
                    </ul>
                </div>
                <div className="rightofbar" id="rightofbar">
                    <div className="contentDisplay">
                    {error ? <p>Some Error Occured! Please Check Details Entered!</p> : null}
                        {filesView && <Files />}
                        {sharedView && <Shared />}
                        {receivedView && <Received />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;