import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";

const UploadPDF = () => {
  const fileRef = useRef(null);
  let navigate = useNavigate();
  const [fileName, setfileName] = useState(null);

  const fileHandler = () => {
    const file = fileRef.current.files[0];
    if (file && file.type === "application/pdf") {
      setfileName(fileRef.current.files[0].name);
    } else {
      setfileName("please upload a .pdf file");
    }
  };

  const submitHandler = () => {
    // setfileName("");
    navigate("/editor", { state: { file: fileRef.current.files[0] } });
  };

  return (
    <div>
      <input
        // style={{ display: "none" }}÷
        onChange={fileHandler}
        ref={fileRef}
        type="file"
        accept=".pdf"
      ></input>
      {fileName ? fileName : <></>}
      <button onClick={submitHandler}>Upload to edit </button>
      {/* <Editor file={fileRef} /> */}
    </div>
  );
};

export default UploadPDF;
