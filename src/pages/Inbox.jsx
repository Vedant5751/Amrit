import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import Sidebar from '../components/Sidebar';

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessageToFirestore = async (message) => {
    try {
      await addDoc(collection(db, 'messages'), {
        text: message.text,
        sender: message.sender,
        timestamp: message.timestamp
      });
    } catch (error) {
      console.error("Error adding message to Firestore: ", error);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      // Create a message object with required fields
      const newMessage = {
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toISOString() // Assuming timestamp is a string
      };

      // Add the message to Firestore
      sendMessageToFirestore(newMessage);

      // Update local state with the new message
      setMessages(prevMessages => [...prevMessages, newMessage]);

      // Clear the input field
      setInputMessage('');
    }
  };

  return (
    <>
    <Sidebar/>
    <div className="flex flex-col h-screen ">
      <div className="overflow-y-auto flex-grow border-b border-gray-200">
        {messages.map((message, index) => (
          <div key={index} className={`text-${message.sender === 'user' ? 'right' : 'left'} mb-2`}>
            <span className={`rounded-lg px-3 py-2 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="flex p-2">
        <input type="text" value={inputMessage} onChange={handleInputChange} className="flex-1 mr-2 px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 rounded-lg" />
        <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Send</button>
      </div>
    </div>
    </>
  );
}
