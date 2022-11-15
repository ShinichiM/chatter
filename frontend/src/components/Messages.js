import React from "react";
import Message from "./Message";

const Messages = ({ messages, name }) => {
  <div>
    {messages.map((message, i) => {
      return (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      );
    })}
  </div>;
};

export default Messages;
