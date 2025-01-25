import React, { useState } from "react";
import "@/style/input.scss"
import UploadIcon from "@/icons/upload-icon-svg";
export default function MultiImageUploader() {
  const [images, setImages] = useState<File[]>([]);
  return (
    <div className="multi__image__upload">
      <div className="multi__image__upload__container">
        <input
          type="file"
          className="multi__image__upload__container__input"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setImages([...images, ...Array.from(files)]);
            }
          }}
        />
        <div className="multi__image__upload__container__overlay">
          <div className="multi__image__upload__container__overlay__icon">
            <UploadIcon />
          </div>
          <div className="multi__image__upload__container__overlay__heading">
            Drop or Select file
          </div>
          <div className="multi__image__upload__container__overlay__info">
            Drop files here or click to browse through your machine.
          </div>
        </div>
      </div>
      {images.length > 0 ? (
        <>
          <div className="multi__image__upload__container__preview">
            {images.map((image) => (
              <div
                key={image.name}
                className="multi__image__upload__container__preview__image"
              >
                <button
                  onClick={() => {
                    setImages(images.filter((img) => img.name !== image.name));
                  }}
                  className="multi__image__upload__container__preview__delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
                <img src={URL.createObjectURL(image)} alt={image.name} />
              </div>
            ))}
          </div>
          <div className="multi__image__upload__actions">
            <button className="multi__image__upload__actions__remove">
              Remove All
            </button>
            <button className="multi__image__upload__actions__upload">
              <UploadIcon />
              Upload All
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
