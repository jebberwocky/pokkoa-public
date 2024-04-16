import React from 'react'
import parse from 'html-react-parser';
import {Mixpanel} from '../Lib/Mixpanel';

function trackRecommendationClick(data){
  Mixpanel.track("recommendation_click", data)
}

const RecommdMessage = (props) => {
  let payload = props.payload
  if(payload.target === undefined || payload.target.length<1){
    payload.target = "_blank"
  }
  const isSponsored = (payload.sponsorship !== undefined && payload.sponsorship.length>0)
  return (
      <div class="react-chatbot-kit-chat-bot-message-container recommd-container">
        <div class="react-chatbot-kit-chat-bot-avatar">
          <div class="react-chatbot-kit-chat-bot-avatar-container">
            <p class="react-chatbot-kit-chat-bot-avatar-letter">{payload.avatar}</p>
            </div>
          </div>
            <div class="react-chatbot-kit-chat-bot-message">
                <div onClick={() => trackRecommendationClick(payload)}><a target={payload.target} href={payload.href}>{parse(payload.text)}</a></div>
                { isSponsored&&
                <div><span class="sponsorship">{payload.sponsorship}</span></div>
                }
                <div class="react-chatbot-kit-chat-bot-message-arrow">
              </div>
            </div>
          </div>
  );
};



export default RecommdMessage;