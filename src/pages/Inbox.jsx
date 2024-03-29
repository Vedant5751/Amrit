import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  // Function to send a message
  const sendMessage = async () => {
    if (messageInput.trim() !== "") {
      const chatId = generateChatId(currentUser.uid, recipientId);
      const messageRef = db.collection(`chats/${chatId}/messages`);
      await messageRef.add({
        senderId: currentUser.uid,
        message: messageInput,
        timestamp: new Date().getTime()
      });
      setMessageInput(""); // Clear message input field after sending
    }
  };

  // Function to fetch existing messages and listen for new messages
  useEffect(() => {
    if (currentUser && recipientId) {
      const chatId = generateChatId(currentUser.uid, recipientId);
      const messageRef = db.collection(`chats/${chatId}/messages`).orderBy("timestamp");
      const unsubscribe = messageRef.onSnapshot((snapshot) => {
        const fetchedMessages = [];
        snapshot.forEach((doc) => {
          fetchedMessages.push(doc.data());
        });
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    }
  }, [currentUser, recipientId]);

  // Function to generate a unique chat ID
  const generateChatId = (userId1, userId2) => {
    return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
  };

  return (
    <div>
      {/* Render chat messages */}
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      {/* Message input field */}
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
