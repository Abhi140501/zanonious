import React, {useEffect} from "react";

function Shared() {
    const [filesList, setFilesList] = React.useState(null);

    useEffect(() => {
        fetch('/sharedfiles').then((res) => res.json()).then((json) => {
            if(Object.keys(json).length) {
                setFilesList({files: json});
            }
        });
    });

    function stopShare() {
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        var data = {
            filename: selected.value
        }
        if(selected) {
            fetch('/stopshare', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                return res.json();
            }).then(result => {
                if(result[0].deleted) {
                    alert("Stopped Sharing the File");
                    window.location.replace('/dashboard');
                }
            });
        } else {    
            alert("Please Select a File!");
        }
    }

    return(
        <div className="shared">
            <div className="actions">
                <ul className="horizontal">
                    <li>
                        <button className="stop" onClick={stopShare}>Stop Sharing</button>
                    </li>
                </ul>
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
                            <td>No Files are Shared!</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Shared;