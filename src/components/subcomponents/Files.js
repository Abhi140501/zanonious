import React, { useEffect } from "react";

function Files() {
    const [filesList, setFilesList] = React.useState(null);

    useEffect(() => {
        fetch('/files').then((res) => res.json()).then((json) => {
            if(Object.keys(json).length) {
                setFilesList({files: json});
            }
        });
    });

    function uploadFile(e) {
        e.preventDefault();
        document.getElementById('upload').click();
    }

    function submitForm() {
        document.getElementById('form').submit();
    }

    function shareFile() {
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        if(selected) {
            document.getElementById('sharing').style.display = "block";
        }else {
            alert("Please Select a File!");
        }
    }

    function shareToUser() {
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        var data = {
            filename: selected.value,
            username: username.value,
            password: password.value
        }
        if(username.value.length != 0) {
            fetch('/share', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                return res.json();
            }).then(retreived => {
                if(retreived[0].shared) {
                    alert("Shared the File with User");
                    document.getElementById('sharing').style.display = "none";
                } else {
                    alert("Error! Username of The Other User Not Found!");
                }
            });
        }else {
            alert("Please enter a Username!");
        }
    }

    function downloadFile() {
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        if(selected) {
            var form = document.createElement('form');
            document.body.appendChild(form);
            form.method="POST";
            form.action="/download";
            var element = document.createElement('INPUT');
            element.name = "filename";
            element.value = selected.value;
            element.type = "hidden";
            form.appendChild(element);
            form.submit();
        } else {
            alert("Please Select a File!");
        }
    }

    function deleteFile() {
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        var data = {
            filename: selected.value
        }
        if(selected) {
            fetch('/delete', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                return res.json();
            });
        } else {
            alert("Please Select a File!");
        }
    }

    function genLink() {
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        var password = document.getElementById('password').value;
        var data = {
            filename: selected.value,
            password: password
        }
        if(selected) {
            if(password.length !== 0) {
                fetch('/genLink', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    return res.json();
                }).then(result => {
                    alert("Link Generated!");
                });
            } else {
                alert("Please Enter The Password to Generate Link!");
            }
        } else {
            alert("Please Select a File!");
        }
    }
 
    return (
        <div className="files">
            <div className="actions">
                <ul className="horizontal">
                    <li>
                        <form id="form" action="/upload" method="POST" encType="multipart/form-data">
                            <input type='file' hidden id="upload" onChange={submitForm} name="file"></input>
                            <button onClick={uploadFile}>Upload File</button>
                        </form>
                    </li>
                    <li>
                        <button className="share" onClick={shareFile}>Share</button>
                    </li>
                    <li>
                        <button className="delete" onClick={deleteFile}>Delete</button>
                    </li>
                    <li>
                        <button className="download" onClick={downloadFile}>Download</button>
                    </li>
                </ul>
            </div>  
            <div className="sharing" id="sharing">
                <label htmlFor="username">Enter Username to share:</label><br></br>
                <input type="text" name="username" id="username"></input><br></br>
                <label htmlFor="password">Enter Sharing Password:</label><br></br>
                <input type="password" name="password" id="password"></input><br></br>
                <button onClick={shareToUser}>Share to User</button><br></br>
                <button onClick={genLink}>Generate Link</button>
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
                            <td>No Files are Uploaded!</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Files;