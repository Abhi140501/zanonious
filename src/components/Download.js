import React from "react";
import { useSearchParams } from "react-router-dom";

function Download() {
    var [searchParams] = useSearchParams();
    var link = searchParams.get("l");

    function downloadNow() {

    }

    return(
        <div className="download">
            <form action="/downloadlink" method="POST">
                <input type="password" name="password"></input>
                <input type="hidden" name="link" value={link}></input>
                <button type="submit">Download</button>
            </form>
        </div>
    )
}

export default Download;   