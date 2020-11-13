

<p align="center">
    <img width="100" height="100" src="public/img/frontend/olaf.png"></a>
    <br />
</p>

# Note 

This project is moved to https://github.com/HananoshikaYomaru/comp4461-botkit2

# COMP4461 project 2 - ChatBot working prototype 

This is a chatbot for theme park. It provides interactive dialogs to users to answers their questions as well as improve their customer experience. Ideally, users can choose different characters as the personality of the chatbot. In this prototype, we use Disney as the context and Olaf as the personality. 

![demo](img/chatbot_demo.gif)

# how to start 

1. install npm and [node](https://nodejs.org/en/)
2. open terminal 
3. run command `npm install -g yo generator-botkit`
4. make an empty directory and cd into directory 
5. run command `git clone https://github.com/HananoshikaYomaru/comp4461-botkit.git`
6. run command `npm install`
7. to start, run command `npm run start`, then server will be set up in `http://localhost:3000`

![response](img/response.png)


# how to update 
1. run command `git pull https://github.com/HananoshikaYomaru/comp4461-botkit.git master`

# current support features 
1. attractions / games (where , queue , waiting time)
2. first aid (where)
3. smoking area (where, how many)
4. atm 
5. first aid / medical  
6. toliet / restroom 
7. water 

# Botkit Starter Kit

This is a Botkit starter kit for web, created with the [Yeoman generator](https://github.com/howdyai/botkit/tree/master/packages/generator-botkit#readme).

To complete the configuration of this bot, make sure to update the included `.env` file with your platform tokens and credentials.

[Botkit Docs](https://botkit.ai/docs/v4)

This bot is powered by [a folder full of modules](https://botkit.ai/docs/v4/core.html#organize-your-bot-code). 
Edit the samples, and add your own in the [features/](features/) folder.
