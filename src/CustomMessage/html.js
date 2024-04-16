import React from 'react'
import parse from 'html-react-parser';

const HtmlMessage = (props) => {
  let payload = props.payload
  return (
    <div class="react-chatbot-kit-chat-bot-message-container">
      <div class="react-chatbot-kit-chat-bot-message">
      {parse(payload.m)}
      </div></div>
  );
};

export default HtmlMessage;