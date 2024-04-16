import React,{ useState } from 'react'
import {createChatBotMessage,createCustomMessage} from "react-chatbot-kit";
import axios from "axios";
import {Mixpanel} from "../Lib/Mixpanel";
import {AnalyticLogger} from "../Lib/AnalyticLogger";
import {RecommdEng} from "../Lib/RecommedationEng"
import {NativeAgent} from "../Lib/NativeAgent";
import parse from 'html-react-parser';
import token from '../token';
import promptGen from '../prompt'


const debugging = (process.env.REACT_APP_DEBUG_MODE === 'true')

const END_WORDS = "G仙祝福你🙏平安喜乐"

function getDivinationPrompt(gua_text, input){
    let prompt = promptGen.getDivinationPrompt(gua_text,input)
    return prompt
}

function parseLinebreak(raw){
    let result = raw.replace(/(?:\r\n|\r|\n)/g, '<br>');
    let regex = /正面|负面|注意|建议|提醒/g;
    let replacement = "<strong>$&</strong>";
    result = result.replace(regex, replacement);
    return parse(result)
}

const updateLastMessage = (props, message) => {
    props.setState((prev) => {
        return { ...prev, messages: [...prev.messages.slice(0, -1), { ...prev.messages.at(-1), message }]};
    });
};

function requestRecommendation(props, message, atag){
    RecommdEng.run(props,{"text":message},atag)
}

async function postMessage(payload,gua,props){
    //let m_gua = "卦象: "+gua[0]+" "+gua[1]+ " "+gua[2]+ ", [卦辭]:"+gua[3][7]+" "
    var guaMessage = createCustomMessage(
        payload.input, 'gua', 
            {payload: {"input":payload.input,"atag":payload.atag,gua}})
    props.setState((prev) => ({
        ...prev,
        //messages: [...prev.messages, createChatBotMessage(m),createCustomMessage('test','rating',{payload:{"input":message,"response":m}},),],
        //messages: [...prev.messages.slice(0,-1), createChatBotMessage(m_gua),],
        messages: [...prev.messages.slice(0,-1), guaMessage,],
    }));
    props.setState((prev) => ({
        ...prev,
        //messages: [...prev.messages, createChatBotMessage(m),createCustomMessage('test','rating',{payload:{"input":message,"response":m}},),],
        messages: [...prev.messages, createChatBotMessage("..."),],
    }));
    const atag = payload.atag
    const user_input = payload.input
    const message = getDivinationPrompt(gua,user_input);
    Mixpanel.track("input",{"data":{message},atag});
    NativeAgent.setMessage({"data":{message},atag,"s":"input"})
    NativeAgent.toast("收到, 请稍等")
    //always use v4 for 解卦
    //console.log(typeof(debugging))
    if(!debugging){
         //JWT
        let bearer_token =token.jwt
        const response = await fetch(process.env.REACT_APP_API_URL+'/stream/v4', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearer_token}`
            },
            body: JSON.stringify({"input":message,
            atag})
        }).catch((error) => {
            AnalyticLogger.log({"input":{message},"response":"network error"},atag);
            Mixpanel.track("error",{"data":{"code":error.code,"message":error.message},atag});
            var m = "🐒😴😴😴 等等试试";
            if(error.code === "ERR_NETWORK" || error.message === "Failed to fetch"){
                m = "网出错了😵 把代理或VPN关掉再试试.G仙在解决这个问题.";
            }
            if(m){
                props.setState((prev) => ({
                    ...prev,
                    //messages: [...prev.messages, createChatBotMessage(m),createCustomMessage('test','rating',{payload:{"input":message,"response":m}},),],
                    messages: [...prev.messages.slice(0,-1), createChatBotMessage(m),],
                }));
            }
        });
        let vs = [];
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
        while (true) {
            const {value, done} = await reader.read();
            if (done){
                vs.push(END_WORDS)
                updateLastMessage(props,parseLinebreak(vs.join("")))
                props.setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages,
                    createCustomMessage(user_input,'rating',{
                        payload: {
                            "input":user_input,
                            "response":vs.join(""),
                            atag,gua},}),],
                }));
                //console.log(vs)
                Mixpanel.track("response",{"data":vs.join("")});
                //extra log to indicate jiegua
                Mixpanel.track("jiegua",{"data":vs.join(""),gua});
                AnalyticLogger.log({"input":message,"response":vs.join("")},atag);
                NativeAgent.setMessage({"data":vs.join(""),"s":"response"})
                //run recommedation eng
                requestRecommendation(props,user_input,atag)
                break;
            }
            vs.push(value)
            updateLastMessage(props,parseLinebreak(vs.join("")))
        }
    }else{
        props.setState((prev) => ({
            ...prev,
            messages: [...prev.messages,
            createCustomMessage(user_input,'rating',{
                payload: {
                    "input":user_input,
                    "response":"debugging",
                    atag,gua},}),],
        }));
        requestRecommendation(props,user_input,atag)
    }
    
}

const Divination = (props) => {
    let payload = props.payload
    const [submitted, setSubmitted] = useState(true);
    return (
        <div class="react-chatbot-kit-chat-bot-message-container">
            <div class="react-chatbot-kit-chat-bot-message">
                <input type="button" 
                        class="react-chatbot-kit-chat-btn-send request-gua-btn"
                        value="点此诚心求卦🙏"
                       disabled={!submitted}
                       onClick={(event) => {
                           props.setState((prev) => ({
                               ...prev,
                               messages: [...prev.messages, createChatBotMessage("收到, 请稍等"),]}));
                           event.preventDefault();
                           setSubmitted(false)
                           var get_url = process.env.REACT_APP_SUANGUA_API_URL+"/suangua";
                           if(payload&&payload.input)
                                get_url += "?seed="+encodeURIComponent(payload.input)
                                axios
                               .get(get_url)
                               .then((response) => {
                                   //console.log(response)
                                   setSubmitted(true)
                                   if(response.data){
                                        Mixpanel.track("gua",{"data":response.data, "atag":payload.atag});
                                        postMessage(payload, response.data, props)
                                   }
                               })
                               .catch((error) => {
                                    setSubmitted(true)
                                    //console.log(error)
                                    Mixpanel.track("error",{"data":error,"atag":payload.atag});
                               });
                       }}
                />
            </div></div>
    );
};

export default Divination;