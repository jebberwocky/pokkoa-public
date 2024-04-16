import axios from 'axios';

const client = axios.create({
    baseURL:  process.env.REACT_APP_ANAYTICS_API_URL
  });

let actions = {
    log: (data,atag) => {
        client
        .post('/like', {
          data,
          atag
        })
        .then((response) => {
            if(response&&response.status!==200){
                console.error(response)
            }
        })
        .catch((error)=> {
            console.error(error)
        });
    }
};


export let AnalyticLogger = actions;