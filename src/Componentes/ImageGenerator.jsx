import React, { useState , useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ImageGenerator.css";
import defaultImage from "../assets/image.jpeg";

const ImageGenerator = () => {

    const [img_url,set_url] = useState("/");
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
                
            }
        );
        const data = await response.json();
        console.log(data);
        set_url(`data:image/jpeg;base64,${data.image}`);
        setLoading(false);
    };

  return (
    <div className="container py-5">

      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-white">
          AI Image <span className="text-success">Generator</span>
        </h1>
      </div>

      {/* Image Card */}
      <div className="card bg-dark border-0 shadow-lg mx-auto image-card">
        <div className="card-body d-flex justify-content-center align-items-center p-4">
          <img src={img_url==="/" ? defaultImage : img_url} alt="Default Image" className="img-fluid rounded"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-10">
          <div className="input-group input-group-lg shadow">
            <input type="text" className="form-control" placeholder="Describe the image you want..." ref={inputRef}/>
            <button className="btn btn-success px-5 fw-bold" onClick={ImgGen} disabled={loading} >
                {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ImageGenerator;