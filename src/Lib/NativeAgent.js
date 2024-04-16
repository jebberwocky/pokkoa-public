let agent = null

if (window.AndroidNative) {
    agent = window.AndroidNative;
}

let actions = {
    isEmbedded: () => {
        return (undefined !==window.AndroidNative)
    },
    toast: (data) => {
        if(agent&&agent.showToast)
            agent.showToast(data)
    },
    setMessage: (data) =>{
        if(agent&&agent.setMessage)
            agent.setMessage(JSON.stringify(data))
    }
}

export let NativeAgent = actions;
