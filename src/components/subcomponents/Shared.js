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