"use client"

// components/FileUpload.tsx
import React, { useRef, useState } from "react";
import classNames from "classnames";

const FileDownload = ({ url }) => {
  const [fileList, setFileList] = useState(null);  const [progress, setProgress] = useState(0);

  const preventDefaultHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDownload = async ({ given_url }) => {
    //url corresponds to an object url of the audio file. i want to download this file and then delete the object url

    //download the file.
    const link = document.createElement("a");
    link.href = given_url;
    link.download = "echoreader.wav";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    //delete the object url

    URL.revokeObjectURL(given_url)
  }

  return ( 
    <div
      className={classNames({
        "w-full h-8": true,
        "p-4 grid place-content-center cursor-pointer": true,
        "border-4 border-solid": true,
        "transition-colors": true,
        "download_links": true,
      })}
      onDragOver={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragEnter={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragLeave={(e) => {
        preventDefaultHandler(e);
        setShouldHighlight(false);
      }}
      onDrop={(e) => {
        preventDefaultHandler(e);
        const files = Array.from(e.dataTransfer.files);
        setFileList(files);
        setShouldHighlight(false);
      }}
    >
      <div className="flex flex-col items-center">
        <button onClick={()=>{handleDownload(url)}}>
            Download audio
        </button>
      </div>
    </div>
  );
};

export default FileDownload;