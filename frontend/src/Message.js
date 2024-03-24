// // 

// import React from 'react';

// const Message = ({ message, ownMessage }) => {
//   const messageStyle = {
//     textAlign: ownMessage ? 'right' : 'left',
//     backgroundColor: ownMessage ? '#DCF8C6' : '#E5E5EA',
//     padding: '8px',
//     borderRadius: '8px',
//     marginBottom: '8px',
//     maxWidth: '100%',
//     wordWrap: 'break-word',
//   };

//   return (
//     <div style={messageStyle}>
//       {message.type === 'join' ? (
//         <p>{`${message.sid} just joined`}</p>
//       ) : (
//         <p>{`${message.sid}: ${message.message}`}</p>
//       )}
//     </div>
//   );
// };

// export default Message;


import React from 'react';

const Message = ({ message, ownMessage }) => {
  const messageStyle = {
    textAlign: ownMessage ? 'right' : 'left',
    backgroundColor: ownMessage ? '#DCF8C6' : '#E5E5EA',
    padding: '8px',
    borderRadius: '8px',
    marginBottom: '8px',
    maxWidth: '100%',
    wordWrap: 'break-word',
  };

  return (
    <div style={messageStyle}>
      {message.type === 'join' ? (
        <p>{`${message.sid} just joined`}</p>
      ) : (
        <div>
          {message.message && <p>{`${message.sid}: ${message.message}`}</p>}
          {message.file && (
            <div>
              <p>{`${message.sid} sent a file:`}</p>
              <p>File Name: {message.file.name}</p>
              <p>File Type: {message.file.type}</p>
              {/* Add further file handling logic here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
