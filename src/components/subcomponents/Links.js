import React, {useEffect} from "react";

function Links() {
    const [filesList, setFilesList] = React.useState(null);

    useEffect(() => {
        fetch('/links').then((res) => res.json()).then((json) => {
            if(Object.keys(json).length) {
                setFilesList({files: json});
            }
        });
    });

    function copyLink() {
        var link = 'localhost:3000/share?l=';
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        if(selected) {
            console.log(selected.value);
            link += selected.value;
            navigator.clipboard.writeText(link);
            alert("Link Copied!");
        } else {
            alert("Please Select a File")
        }
    }

    function removeLink() {
        var radios = document.getElementsByName('chosenFile');
        var selected = Array.from(radios).find(radio => radio.checked);
        var data = {
            link: selected.value
        }
        if(selected) {
            fetch('/deleteLink', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                return res.json();
            }).then(() => {
                alert("Link Removed!");
                window.location.replace('/dashboard');
            })
        } else {
            alert("Please Select a File!");
        }
    }

    return(
        <div className="links">
            <div className="actions">
                <ul className="horizontal">
                    <li>
                        <button className="stop" onClick={copyLink}>Copy Link</button>
                        <button className="remove" onClick={removeLink}>Remove Link</button>
                    </li>
                </ul>
            </div>
            <table>
                <tbody>
                    {filesList ? 
                            filesList.files.map(file => 
                                    <tr key={file._id}>
                                        <td><input type="radio" name="chosenFile" value={file.link}></input></td>
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

export default Links;