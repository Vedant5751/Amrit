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
    <div className="flex flex-col justify-center items-center">
      <Sidebar />
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
        className="border border-gray-300 rounded-md p-2 mt-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mt-2"
      >
        Upload
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {predictions && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Predictions</h2>
          <ul className="list-disc ml-6">
            {Object.entries(predictions).map(([key, value]) => (
              <li key={key} className="mt-2">
                <span className="font-semibold">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AI;
