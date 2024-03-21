import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import  Message  from './Message';


const socket = io("http://127.0.0.1:8000", {
  path: "/sockets",
});
// const socket = io(process.env.REACT_APP_API_URL, {
//   path: process.env.REACT_APP_SOCKET_PATH,
// });

const Chat = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    useEffect(() => {
      socket.on('connect', () => {
        setIsConnected(socket.connected);
      });
  
      socket.on('disconnect', () => {
        setIsConnected(socket.connected);
      });
  
      socket.on('join', (data) => {
        setMessages((prevMessages) => [...prevMessages, { ...data, type: 'join' }]);
      });
  
      socket.on('chat', (data) => {
        setMessages((prevMessages) => [...prevMessages, { ...data, type: 'chat' }]);
      });
    }, []);

    const handleMessageChange = (event) => {
        const value = event.target.value.trim();
        setMessage(value);
      };
    
      const handleSendMessage = () => {
        if (message && message.length) {
          socket.emit('chat', message);
          setMessage('');
        }
      };
    
      const handleKeyDown = (event) => {
        if (event.keyCode === 13) { // Enter key
          handleSendMessage();
        }
      };
  
    return (
      <>
      <h1>{process.env.REACT_APP_API_URL}</h1>
        <h2>status: {isConnected ? 'connected' : 'disconnected'}</h2>
        <div
          style={{
            height: '500px',
            overflowY: 'scroll',
            border: 'solid black 1px',
            padding: '10px',
            marginTop: '15px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </div>
        {/* <input
          type={'text'}
          id='message'
          onChange={(event) => {
            const value = event.target.value.trim();
            setMessage(value);
          }}
        ></input>
        <button
          onClick={() => {
            if (message && message.length) {
              socket.emit('chat', message);
            }
            var messageBox = document.getElementById('message');
            messageBox.value = '';
            setMessage('');
          }}
        >
          Send
        </button> */}
        <input
        type={'text'}
        id='message'
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSendMessage}>Send</button>
      </>
    );
}

export default Chat