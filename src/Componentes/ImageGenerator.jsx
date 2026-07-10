import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ImageGenerator.css";
import defaultImage from "../assets/image.jpeg";

const ImageGenerator = () => {
  const [img_url, set_url] = useState("/");
  const inputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const ImgGen = async () => {
    if (!inputRef.current.value.trim()) {
      return;
    }
    setLoading(true);
    const response = await fetch(
      "https://ai-image-generator.ranjanmaiti2022.workers.dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 12345678",
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
        }),
      },
    );
    const data = await response.json();
    console.log(data);
    set_url(`data:image/jpeg;base64,${data.image}`);
    setLoading(false);
  };

  return (
    <div className="container min-vh-100 d-flex flex-column py-4">
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-white">
          AI Image <span>Generator</span>
        </h1>
      </div>

      {/* Image Card */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <div className="card border-0 shadow-lg image-card">
          <div className="card-body d-flex justify-content-center align-items-center p-4">
            <img
              src={img_url === "/" ? defaultImage : img_url}
              alt="Default Image"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row justify-content-center mt-4 mb-3">
        <div className="col-lg-10">
          <div className="input-group input-group-lg shadow">
            <input
              type="text"
              className="form-control"
              placeholder="Describe..."
              ref={inputRef}
            />
            <button
              className="btn px-5 fw-bold"
              onClick={ImgGen}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>

    <footer className="text-center mt-auto pb-3">
        <small>
            Designed & Developed by Ranjan Maiti
            © 2026 • All Rights Reserved.
        </small>
    </footer>
    </div>
  );
};

export default ImageGenerator;
