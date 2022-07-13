import React from "react";

function Dashboard() {
    fetch('/username').then(res => {
        return res.json();
    }).then(username => {
        if(username[0].username) {
            if(!username[0].twofa) {
                window.location.replace('/2fa');
            } else if(!username[0].verify) {
                window.location.replace('/2fa?verify=true');
            }
        } else {
            window.location.replace('/');
        }
    });

    return(
        <div className="Dashboard">
            Dashboard
        </div>
    );
}

export default Dashboard;