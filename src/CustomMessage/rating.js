import React,{ useState } from 'react';
import {BsHandThumbsUpFill, BsHandThumbsUp, BsDownload} from "react-icons/bs";
import {createCustomMessage} from "react-chatbot-kit";
import { Mixpanel } from '../Lib/Mixpanel';
import axios from 'axios';
import {GuaUitl} from '../Lib/GuaUitl'

const client = axios.create({
    baseURL:  process.env.REACT_APP_XIAN_API_URL
  });

const sendRating = (param,payload) =>{
    Mixpanel.track("like",{"data":payload});
}

const downloadImg = (payload,props, callback) =>{
  //console.log(payload)
  //console.log(GuaUitl.unicodeGua(payload.gua[1]))
  Mixpanel.track("download",{"data":payload});
  let hexagramtext = `${payload.gua[1]} ${payload.gua[2]} ${payload.gua[3][7]}`
  let body = {
    input:{"hexagram":GuaUitl.unicodeGua(payload.gua[1]),
    "hexagramtext":hexagramtext,
    "input":payload.input,
    "result":payload.response},
    "atag":payload.atag}
    client
    .post('/image', body)
    .then((response) => {
        if(response&&response.status!==200){
            console.error(response)
        }else{
          if(response.data&&response.data.status==="ok"){
            let url = process.env.REACT_APP_IMG_URL+"/"+response.data.path
            let imgMessage = createCustomMessage(url,'chathtml',{payload:{"m":
            "<span class='sponsorship'>背景图由G仙提供</span><span>长按保存图片</span><img class=\"img-qian\" src=\""+url+"\">",}})
            props.setState((prev) => ({
              ...prev,
              messages: [...prev.messages,
                imgMessage,],
            }));
            callback(true)
          }
        }
    })
    .catch((error)=> {
        console.error(error)
    });
}

const RatingMessage = (props) => {
  let payload = props.payload
  const [isRated, setRate] = useState(false);
  const [isDownloadStart, setIsDownloadStart] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const handleRatingClick = (e,param,payload) => {
    setRate(!isRated)
    if(!isRated)
      sendRating(param,payload)

    alert("人生再苦\n活得再累\n也要告诉自己\n别放弃\n坚强勇敢\nG仙祝你平安喜乐")
  }
  const handleDownloadClick = (e,payload) => {
    setIsDownloadStart(true)
    downloadImg(payload,props,setIsDownload)
  }
  let thumbup
  if(isRated){
    thumbup = <BsHandThumbsUpFill/>;}
  else{
    thumbup = <BsHandThumbsUp />;}
  let downloadtext= ""
  if(isDownloadStart){
    downloadtext = "开始下载, 请稍等..." 
  }else{
    downloadtext = "点此保存"
  }

  return (
    <div class="react-chatbot-kit-chat-bot-message-container">
      {!isDownload &&
      <div class="react-chatbot-kit-chat-bot-message rating-message">
       <div onClick={event=>handleDownloadClick(event, payload,props)} >{downloadtext} <BsDownload /></div>
      </div>}
      <div class="react-chatbot-kit-chat-bot-message rating-message" onClick={event =>handleRatingClick(event,"good",payload)}>
       说得好! 点此感谢G仙 {thumbup} 
      </div>
    </div>
  );
};

export default RatingMessage;