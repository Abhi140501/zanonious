import React from "react";
import Header from "./Header";
import Login from "./Login";

function Main(props) {

    return(
        <div className="Main">
            <Header />
            {props.page ? <Login page="2fa" /> : <Login />}
        </div>
    );
}

export default Main;