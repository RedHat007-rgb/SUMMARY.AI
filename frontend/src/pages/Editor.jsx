// src/pages/Editor.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "../utils/pdfConfig"; // configures the worker

const Editor = () => {
  const [pageItems, setPageItems] = useState([]);

  const location = useLocation();
  const uploadedFile = location.state?.file;

  useEffect(() => {
    if (!uploadedFile) return;

    const extractTextFromPdf = async () => {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        const allItems = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          allItems.push({
            pageNumber: i,
            items: content.items,
          });
        }

        setPageItems(allItems);
      };

      reader.readAsArrayBuffer(uploadedFile);
    };

    extractTextFromPdf();
  }, [uploadedFile]);

  //   const editHandler = () => {};

  return (
    <div>
      <h1>PDF Content</h1>
      {pageItems.map((page) => (
        <div
          key={page.pageNumber}
          style={{
            width: "595px",
            height: "842px",
            position: "relative",
            margin: "20px auto",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <h2
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              fontSize: "16px",
            }}
          >
            Page {page.pageNumber}
          </h2>
          {page.items.map((item, index) => (
            <div
              //   onClick={editHandler}
              contentEditable
              key={index}
              style={{
                position: "absolute",
                left: `${item.transform[4]}px`,
                top: `${item.transform[5]}px`,
                fontSize: `${item.height}px`,
                whiteSpace: "pre",
              }}
            >
              {item.str}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Editor;
