### NOTICE: Pokkoa project is under active development. This repository is updated periodically. Check back for updates every 2 to 4 weeks

# About the Pokkoa Project 
![pokkoa qrcode](https://github.com/jebberwocky/pokkoa-public/blob/main/pokkoa-qrcode.jpg?raw=true)
## Intro
### 什么是 Pokkoa.cc ?
### What is Pokkoa.cc
将AI 结合周易算卦. 好奇AI和周易可以碰撞出怎样的火花, 并用在心理治疗的可行性。为心理治疗提供更有效的解决方案。
An independent team is curious about the potential sparks that could emerge from the collision of AI and I Ching, and their feasibility in psychological therapy. How can we leverage the combination of AI and I Ching to provide more effective solutions for psychological treatment?

欢迎大家都来玩看看和提建议!
Feel free to visit and any comment is welcome

目前想推广到欧美和日本. DM我如果有兴趣~ 
We are entering US, EU and Japan. Message me if you are interested
感谢
thanks

## build env
.env.production
```
#GENERATE_SOURCEMAP=false
REACT_APP_API_URL = ---MASKED---
REACT_APP_ANAYTICS_API_URL = ---MASKED---
REACT_APP_SUANGUA_API_URL = ---MASKED---
REACT_APP_XIAN_API_URL = ---MASKED---
REACT_APP_IMG_URL = ---MASKED---
GENERATE_SOURCEMAP = false
REACT_APP_DEBUG_MODE = false
```

# Notice
## token.js
JWT is required. For JWT functionality, keep token.js in the same directory as app.js. 
Example:
```
const token = {
    jwt: '---MASKED---'
}
  
export default token
```
## prompt.js
prompt.js is prompt generator. keep prompt.js in the same directory as app.js. 
Example:
```
const prompt = {
    getDivinationPrompt: function(){...}
}
  
export default prompt
```
