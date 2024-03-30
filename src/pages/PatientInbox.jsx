import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { FloatingNavDemo } from "../components/PatientNav";

export default function PatientInbox() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        text: inputMessage,
        sender: "patient",
        timestamp: new Date().toISOString(),
      };

      try {
        await addDoc(collection(db, "messages"), newMessage);
        setInputMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <>
      <div className="">
        <FloatingNavDemo />
      </div>
      <div className="p-4 ">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex flex-col h-screen ">
            <div className="overflow-y-auto flex-grow border-b border-gray-200">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 text-${
                    message.sender === "user" ? "right" : "left"
                  } mb-2`}
                >
                  <span
                    className={`rounded-lg px-3 py-2 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex p-2">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                className="flex-1 mr-2 px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 rounded-lg"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
