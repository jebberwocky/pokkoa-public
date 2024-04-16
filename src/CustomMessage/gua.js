import React from 'react'

function unicodeGua(gua){
  let k64=["乾",
  "坤",
  "屯",
  "蒙",
  "需",
  "訟",
  "師",
  "比",
  "小畜",
  "履",
  "泰",
  "否",
  "同人",
  "大有",
  "謙",
  "豫",
  "隨",
  "蠱",
  "臨",
  "觀",
  "噬嗑",
  "賁",
  "剝",
  "復",
  "无妄",
  "大畜",
  "頤",
  "大過",
  "坎",
  "離",
  "咸",
  "恆",
  "遯",
  "大壯",
  "晉",
  "明夷",
  "家人",
  "睽",
  "蹇",
  "解",
  "損",
  "益",
  "夬",
  "姤",
  "萃",
  "升",
  "困",
  "井",
  "革",
  "鼎",
  "震",
  "艮",
  "漸",
  "歸妹",
  "豐",
  "旅",
  "巽",
  "兌",
  "渙",
  "節",
  "中孚",
  "小過",
  "既濟",
  "未濟"]
  let seed = k64.indexOf(gua)+19904
  return String.fromCharCode(seed)
}

const GuaMessage = (props) => {
  let payload = props.payload
  const gua = payload.gua
  return (
    <div class="react-chatbot-kit-chat-bot-message-container gua-container">
      <div class="react-chatbot-kit-chat-bot-message">
        <div class="gua">
          <span>您起的卦是:</span>
          <h1><span class="gua-unicode">{unicodeGua(gua[1])}</span>{gua[1]}之{gua[2]}</h1>
          <p lass="lead"><strong>{gua[3][0]}</strong></p>
          <p>{gua[3][7]}</p>
          <ul>
        {Object.keys(gua[4]).map(x => (  
          <li key={x}>  
            {gua[4][x]}  
          </li>  
        ))} </ul> 
        </div>
      </div></div>
  );
};

export default GuaMessage;