import axios from 'axios';
import {createCustomMessage} from "react-chatbot-kit";
import {Mixpanel} from './Mixpanel';

const client = axios.create({
    baseURL:  process.env.REACT_APP_ANAYTICS_API_URL
  });

const NO_ACTION = "NONE"

let actions = {
    run: (props,input,atag) => {
        client
        .post('/re/eng', {
          input,
          atag
        })
        .then((response) => {
            //console.log(response.data)
            if(response&&response.data){
                if(response.data.text !== NO_ACTION){
                    Mixpanel.track("recommendation",{"data":response.data,atag,input});
                    props.setState((prev) => ({
                        ...prev,
                        messages: [...prev.messages,
                        createCustomMessage(input.text,'recommedation',{payload:response.data,}),],
                    }));
                }
            }
            if(response&&response.status!==200){
                console.error(response)
            }
        })
        .catch((error)=> {
            console.error(error)
        });
    }
};


export let RecommdEng = actions;