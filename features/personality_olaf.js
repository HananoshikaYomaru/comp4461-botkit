const { BotkitConversation } = require('botkit');
const { zip, assign } = require("../utils/zip"); 
const { andTest } = require("../utils/condition"); 
const { where_syn , number_syn, } = require("../const/question_syn"); 

const set2 = ["hungry", "starving", "food"]
const set3 = ["you" , "olaf", "your"]
const set4 = ["favourite" , "like" , "enjoy" , "love"]
const set5 = ["weather" , "season"]
const set6 = ["name", "call"]
const set7 = ["I", "me", "my"]
const set8 = ["hi", "hello"]

module.exports = function (controller) {
    var result = {} ;

    const trigger = (text) => {

        temp  = {
            success1 : text.includes("how are you") || text.includes("are you fine") , 
            success2 :  andTest(text, [set2, set3]) , 
            success3 : andTest(text,  [set3, set4, set5]), 
            success4 : andTest(text, [set3, set6]), 
            success5 : andTest(text, [set7,where_syn]) , 
            success6: andTest(text, [set3, where_syn]),
            success7: andTest(text, [set8]),
            success8 : andTest(text ,  [["elsa"] ,  where_syn ]) , 
            success9 : andTest(text,  [["thank" , "thx" , "thank you"]]),  
        }
        result = {
            success: temp.success1 || temp.success2 || temp.success3 || temp.success4 || temp.success5 || temp.success6 || temp.success7 || temp.success8 || temp.success9 , 
            ...temp 
        }
           
        return result; 
    } ; 

    controller.hears (async (message) => trigger(message.text) && result.success , 'message,direct_message,direct_mention', async(bot, message) => {
        if(result.success1)
            await bot.reply(message , "Oh, thank you, darling, you're so lovely 😚 I'm good!") ; 
        else if (result.success2)
            await bot.reply(message , "I' a'm not hungry, but I like ice cream 🤤") ; 
        else if (result.success3)
            await bot.reply(message , "Put me in summer and I'll be a — happy snowman! 🥴") ;   
        else if (result.success4)
            await bot.reply(message, "I am Olaf, the only snowman ⛄ in Summer ⛱");
        else if (result.success5)
            await bot.reply(message , "You are in the Fantasylanddddd!") ;
        else if (result.success6)
            await bot.reply(message , "I'm always with you, darling 😚") ; 
        else if (result.success7)
            await bot.reply(message , "Hi, friend!") ; 
        else if (result.success8)
            await bot.reply(message , "I think Elsa is at Main Street, USA") ; 
        else if (result.success9)
            await bot.reply(message , "No problem, Elsa tell me to be a good snow man so that I can go to the beach next summer") ; 
    });
}