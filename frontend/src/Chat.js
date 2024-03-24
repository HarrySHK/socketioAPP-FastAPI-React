// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import  Message  from './Message';
// import { IoSend } from "react-icons/io5";


// const socket = io("http://127.0.0.1:8000", {
//   path: "/sockets",
// });
// // const socket = io(process.env.REACT_APP_API_URL, {
// //   path: process.env.REACT_APP_SOCKET_PATH,
// // });

// const Chat = () => {
//     const [isConnected, setIsConnected] = useState(socket.connected);
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     useEffect(() => {
//       socket.on('connect', () => {
//         setIsConnected(socket.connected);
//       });
  
//       socket.on('disconnect', () => {
//         setIsConnected(socket.connected);
//       });
  
//       socket.on('join', (data) => {
//         setMessages((prevMessages) => [...prevMessages, { ...data, type: 'join' }]);
//       });
  
//       socket.on('chat', (data) => {
//         setMessages((prevMessages) => [...prevMessages, { ...data, type: 'chat' }]);
//       });
//     }, []);

//     const handleMessageChange = (event) => {
//         const value = event.target.value.trim();
//         setMessage(value);
//       };
    
//       const handleSendMessage = () => {
//         if (message && message.length) {
//           socket.emit('chat', message);
//           setMessage('');
//         }
//       };
    
//       const handleKeyDown = (event) => {
//         if (event.keyCode === 13) { // Enter key
//           handleSendMessage();
//         }
//       };
  
//     return (
//       <>
//         <h2 style={{textAlign:'center'}}>status: {isConnected ? 'connected' : 'disconnected'}</h2>
//         <div
//           style={{
//             height: '500px',
//             overflowY: 'scroll',
//             border: 'solid black 1px',
//             padding: '10px',
//             marginTop: '15px',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           {messages.map((message, index) => (
//             <Message message={message} key={index} ownMessage={message.sid === socket.id} />
//           ))}
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}>
//         <input
//           type={'text'}
//           id='message'
//           value={message}
//           onChange={handleMessageChange}
//           onKeyDown={handleKeyDown}
//           style={{ marginRight: '10px', width:'400px', height:'30px',borderRadius:'20px',border:'4px solid black' }}
//         />
//         <button onClick={handleSendMessage} style={{ fontSize:'35px', backgroundColor:'transparent', border:'none', cursor:'pointer' }}>
//           <IoSend />
//         </button>
//       </div>
//       </>
//     );
// }

// export default Chat


import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import Message from './Message';
import { IoSend } from "react-icons/io5";

const socket = io("http://127.0.0.1:8000", {
  path: "/sockets",
});

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null); // Added state to hold the selected file
  const [fileName, setFileName] = useState(''); // State to hold the selected file name

  const fileInputRef = useRef(null); // Create a ref for file input

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
    setMessage(event.target.value.trim());
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : ''); // Update the file name
  };

  const handleSendMessage = () => {
    if (message || file) {
      const messageObject = {
        message: message,
        file: file ? {
          name: file.name,
          type: file.type,
          data: file,
        } : null,
      };
      console.log(file)
      socket.emit('chat', messageObject);
      setMessage('');
      setFile(null);
      setFileName(''); // Clear the file name after sending the message
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) { // Enter key
      handleSendMessage();
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>status: {isConnected ? 'connected' : 'disconnected'}</h2>
      <div style={{
        height: '500px',
        overflowY: 'scroll',
        border: 'solid black 1px',
        padding: '10px',
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {messages.map((message, index) => (
          <Message message={message} key={index} ownMessage={message.sid === socket.id} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}>
        <input
          type={'text'}
          id='message'
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          style={{ marginRight: '10px', width: '400px', height: '30px', borderRadius: '20px', border: '4px solid black' }}
        />
        <div style={{position: 'relative'}}>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            style={{ position: 'absolute', width: '100%', height: '100%', opacity: '0', cursor: 'pointer' }}
            ref={fileInputRef} // Assign the ref to file input
          />
          <button onClick={() => { fileInputRef.current.click(); }} style={{ fontSize: '35px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
            📎
          </button>
          {fileName && <p>{fileName}</p>} {/* Display selected file name */}
        </div>
        <button onClick={handleSendMessage} style={{ fontSize: '35px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <IoSend />
        </button>
      </div>
    </>
  );
};

export default Chat;
