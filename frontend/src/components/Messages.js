import React from "react";
import Message from "./Message";
import "../App.css";

const Messages = ({ messages, name }) => {
  // console.log(messages);
  return (
    <div>
      {messages.map((message, i) => {
        return (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
