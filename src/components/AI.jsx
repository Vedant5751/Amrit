import React, { useState } from "react";
import axios from "axios";

const AI = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPredictions(response.data);
      setError(null);
    } catch (error) {
      if (error.response) {
        
        setError(`Server responded with status ${error.response.status}`);
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        
        setError("No response received from server");
        console.error("No response received:", error.request);
      } else {
        
        setError("Error uploading file. Please try again later.");
        console.error("Error uploading file:", error.message);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
      {error && <p>{error}</p>}
      {predictions && (
        <div>
          <h2>Predictions</h2>
          <ul>
            {Object.entries(predictions).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AI;
