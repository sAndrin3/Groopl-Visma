// import "./messages.scss";
// import { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8081'); // Replace the URL with your backend server URL

// const Messages = ({ currentUserId }) => {
//   const [messageText, setMessageText] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.emit('user:join', currentUserId);

//     socket.on('user:connected', (userId) => {
//       console.log(`User with ID ${userId} connected.`);
//     });

//     socket.on('user:disconnect', (userId) => {
//       console.log(`User with ID ${userId} disconnected.`);
//     });

//     socket.on('message:receive', ({ from, text }) => {
//       setMessages((prevMessages) => [...prevMessages, { from, text, isCurrentUser: false }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [currentUserId]);

//   const handleSendMessage = () => {
//     if (messageText.trim() !== '') {
//       const newMessage = {
//         from: 'You', // You can customize the 'from' field to display your username
//         text: messageText.trim(),
//         isCurrentUser: true,
//       };
//       setMessages((prevMessages) => [...prevMessages, newMessage]);

//       socket.emit('message:send', {
//         from: 'You', // You can customize the 'from' field to send your username
//         to: 'user2', // For this example, assume the recipient has an ID 'user2'
//         text: messageText.trim(),
//       });

//       setMessageText('');
//     }
//   };

//   return (
//     <div className="messages-container">
//       <div className="chat-container">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`message ${message.isCurrentUser ? 'right' : 'left'}`}
//           >
//             <span className="from">{message.from}</span>
//             <p>{message.text}</p>
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={messageText}
//           onChange={(e) => setMessageText(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Messages;
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import "./messages.scss"

const Messages = ({ username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const socket = io("http://localhost:8081/messages"); // Replace with your backend server URL

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage.trim(),
        time: new Date(Date.now()).toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Messages</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, index) => {
                        return (
                            <div
                                className="message" key={index}
                                id={username === messageContent.author ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="message..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Messages;