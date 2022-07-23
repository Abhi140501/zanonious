import React, {useEffect} from "react";

function Received() {
    const [filesList, setFilesList] = React.useState(null);

    useEffect(() => {
        fetch('/receivedfiles').then((res) => res.json()).then((json) => {
            if(Object.keys(json).length) {
                setFilesList({files: json});
            }
        });
    });
    
    function downloadShare() {
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        var password = document.getElementById('password');
        var form = document.createElement('form');
        document.body.appendChild(form);
        form.method="POST";
        form.action="/downloadshare";
        var element = document.createElement('INPUT');
        element.name = "filename";
        element.value = selected.value;
        element.type = "hidden";
        form.appendChild(element);
        var pass = document.createElement('INPUT');
        pass.name = "password";
        pass.value = password.value;
        pass.type = "hidden";
        form.appendChild(pass);
        form.submit();
    }

    function displayPass() {
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        if(selected) {
            document.getElementById('downloadPass').style.display = "block";
        } else {
            alert("Please Select a File!");
        }
    }

    return(
        <div className="shared">
            <div className="actions">
                <ul className="horizontal">
                    <li>
                        <button className="stop" onClick={displayPass}>Download</button>
                    </li>
                </ul>
            </div>
            <div className="downloadPass" id="downloadPass">
                <label htmlFor="password">Enter Sharing Password:</label><br></br>
                <input type="password" name="password" id="password"></input><br></br>
                <button onClick={downloadShare}>Download</button><br></br>
            </div>
            <table>
                <tbody>
                    {filesList ? 
                            filesList.files.map(file => 
                                    <tr key={file._id}>
                                        <td><input type="radio" name="chosenFile" value={file.file}></input></td>
                                        <td>{file.origin}</td> 
                                    </tr>
                                )
                    :
                        <tr>
                            <td>No Files are Received!</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Received;