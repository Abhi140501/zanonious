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

    return (
        <div className="files">
            <table>
                <thead>
                    <tr>
                        <td>Filename</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {filesList ? 
                            filesList.files.map(file => 
                                    <tr key={file._id}>
                                        <td>{file.origin}</td> 
                                        <td></td>
                                    </tr>
                                )
                    :
                        <tr>
                            <td colSpan={2}>No Files are Uploaded!</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Files;