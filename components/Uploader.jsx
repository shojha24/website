"use client"

// components/FileUpload.tsx
import { POST } from '../app/api/route.js';
import React, { useRef, useState } from "react";
import classNames from "classnames";
import FileDownload from "./Downloader.jsx";
import { Buffer } from 'buffer';

const FileUpload = () => {

  const [fileList, setFileList] = useState(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const preventDefaultHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = async () => {
    const UPLOAD_URL = "https://f17f-47-19-124-248.ngrok-free.app/get_img";
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
  
    console.log(images);
    console.log(indices);

    const data = {
      "images": images,
      "indices": indices
    }

    let response = await POST(UPLOAD_URL, data);

    // extract audio from response

    let audio = response["audio"];
    console.log(audio)

    // the audio is base64 encoded in utf-8, so we need to decode it
    const stringBuf = Buffer.from(audio, 'utf-8'); // Ta-da
    let decodedAudio = Buffer.from(stringBuf).toString('base64'); //atob(audio);
    console.log(`decoded: ${decodedAudio}`)

    // convert the decoded audio to a wav file
    // create a new array of 8-bit unsigned integers

    let wav = new Uint8Array(audio.length);
    for (let i = 0; i < audio.length; i++) {
      wav[i] = audio.charCodeAt(i);
    }

    // create a blob from the array
    let blob = new Blob([wav], {type: "audio/wav"});
    console.log(blob)

    // create a URL for the blob
    let url = URL.createObjectURL(blob);
    console.log(url)

    setAudioUrl(url);
  };

  return ( 
    <section className="m-0 p-0 w-full h-60 flex flex-wrap justify-center">
    <div
      className={classNames({
        "w-full h-40": true,
        "p-4 grid place-content-center cursor-pointer": true,
        "text-teal-500 font-bold rounded-lg": true,
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
              <button className="bg-teal-500 text-teal-50 active:bg-teal-600 px-2 py-1 rounded-md"
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
    <div>
    {audioUrl && <FileDownload url={audioUrl} />}
    </div>
    </section>
  );
};

export default FileUpload;