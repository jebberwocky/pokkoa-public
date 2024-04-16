// new file called DogPicture.jsx
import React, { useEffect } from 'react';

const Welcome = () => {
  //const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {}, []);

  return (
    <div class="react-chatbot-kit-chat-bot-message-container">
        <div class="react-chatbot-kit-chat-bot-avatar">
            <div class="react-chatbot-kit-chat-bot-avatar-container"><p class="react-chatbot-kit-chat-bot-avatar-letter">🙊</p></div></div><div class="react-chatbot-kit-chat-bot-message">
        <span>保护您的私隐,请勿任何泄露个人信息. 有任何问题, 欢迎联系:
            <a href="mailto:contact@pokkoa.cc">contact@pokkoa.cc</a></span>
        <div>
            <span>输入"算卦"加上你想问的. 比如: 算卦 学业</span>
        </div>
        <div>
            G仙今天休息了, 明天再来哈! G仙祝福你🙏平安喜乐
        </div>
        <div class="react-chatbot-kit-chat-bot-message-arrow"></div>
        </div></div>
  );
};

export default Welcome;