// new file called DogPicture.jsx
import React, { useEffect } from 'react';

const Welcome = () => {
  //const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {}, []);

  return (
    <div class="react-chatbot-kit-chat-bot-message-container">
        <div class="react-chatbot-kit-chat-bot-avatar">
            <div class="react-chatbot-kit-chat-bot-avatar-container"><p class="react-chatbot-kit-chat-bot-avatar-letter">🙊</p></div></div><div class="react-chatbot-kit-chat-bot-message">
        <span>请保护您的隐私,避免泄露过多敏感信息。欢迎联系:
            <a href="mailto:contact@pokkoa.cc">contact@pokkoa.cc</a></span>
        <div>
            <span>输入"算卦"加上你想问的. 比如: 算卦 当月学业挑战.</span>
        </div>
        <div class="react-chatbot-kit-chat-bot-message-arrow"></div>
        </div></div>
  );
};

export default Welcome;