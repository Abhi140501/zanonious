import React from "react";
import Files from "./subcomponents/Files";

function Dashboard() {
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

    function uploadFile(e) {
        e.preventDefault();
        document.getElementById('upload').click();
    }

    function submitForm() {
        document.getElementById('form').submit();
    }

    return(
        <div className="Dashboard">
            <form id="form" action="/upload" method="POST" encType="multipart/form-data">
                <input type='file' hidden id="upload" onChange={submitForm} name="file"></input>
                <button onClick={uploadFile}>Upload File</button>
            </form>
            <Files />
            <form action="/logout" method="POST">
                <button type="submit">Encrypt and Logout</button>
            </form>
        </div>
    );
}

export default Dashboard;