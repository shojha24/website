"use client"

// components/FileUpload.tsx
import { GET } from '../app/api/route.js';
import React, { useRef, useState } from "react";
import classNames from "classnames";

const FileUpload = () => {
  const [fileList, setFileList] = useState(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const [progress, setProgress] = useState(0);

  const preventDefaultHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const formDataToJson = (formData) => {
    const json = {};
    for (let [key, value] of formData.entries()) {
        json[key] = value;
      }
    return json;
  };

  const handleUpload = async () => {
    const UPLOAD_URL = "http://c8ec-47-19-124-248.ngrok-free.app/get_img";
    const data = new FormData();
    let i = 0;
    let images = [];
    let indices = [];
    let filePromises = [];
  
    for (let file of fileList) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      const filePromise = new Promise((resolve) => {
        reader.onloadend = () => {
          const base64Data = reader.result.split(",")[1];
          images.push(base64Data);
          indices.push(i);
          i += 1;
          resolve();
        };
      });
  
      filePromises.push(filePromise);
    }
  
    await Promise.all(filePromises);
  
    console.log(images);
    console.log(indices);
  
    data.append("images", images);
    data.append("indices", indices);
  
    const jsonData = formDataToJson(data);
    console.log(jsonData);

    const url = UPLOAD_URL + JSON.stringify(jsonData);

    let response = await GET(url);

    console.log(response);
  };

  return (
    <div
      className={classNames({
        "w-full h-56": true,
        "p-4 grid place-content-center cursor-pointer": true,
        "text-teal-500 rounded-lg": true,
        "border-4 border-dashed ": true,
        "transition-colors": true,
        "border-teal-500 bg-teal-100 hover:bg-teal-200 hover:border-teal-900": shouldHighlight,
        "border-teal-100 bg-teal-50 hover:bg-teal-100 hover:border-teal-200": !shouldHighlight,
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
        {!fileList ? (
          <>
            <span>
              Drag a file here.
            </span>
          </>
        ) : (
          <>
            <p>Files to Upload</p>
            {fileList.map((file, i) => {
              return <span key={i}>{file.name}</span>;
            })}
            <div className="flex gap-2 mt-2">
              <button className="bg-teal-500 text-teal-50 px-2 py-1 rounded-md"
                onClick={() => {handleUpload()}}>
                Upload
              </button>
              <button
                className="border border-teal-500 px-2 py-1 rounded-md"
                onClick={() => {
                  setFileList(null);
                }}
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;