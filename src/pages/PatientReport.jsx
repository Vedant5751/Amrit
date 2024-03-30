import React, { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/config"; // Assuming you have initialized Firebase Storage
import { FloatingNavDemo } from "../components/PatientNav";

export default function PatientReport() {
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        const imageUrl = await getDownloadURL(ref(storage, "images/realpic3-removebg-preview.jpg"));
        setFileUrl(imageUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching file URL:", error);
        setLoading(false);
      }
    };

    fetchFileUrl();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const handleDownload = () => {
    // Implement download logic here if needed
    alert("Download functionality will be implemented here.");
  };

  return (
    <>
    <FloatingNavDemo />
    <div className="container mx-auto flex justify-center items-center h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : fileUrl ? (
        <div className="text-center">
          <img src={fileUrl} alt="Uploaded" className="max-w-full h-auto" />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 focus:outline-none hover:bg-blue-600"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      ) : (
        <p>No file found.</p>
      )}
    </div>
    </>
  );
}
