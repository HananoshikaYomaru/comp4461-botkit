const { BotkitConversation } = require('botkit');
const { zip, assign } = require("../utils/zip"); 
const { andTest } = require("../utils/condition"); 
const { where_syn } = require("../const/question_syn"); 

const set2 = ["hungry", "starving", "food"]
const set3 = ["you" , "olaf"]
const set4 = ["favourite" , "like" , "enjoy" , "love"]
const set5 = ["weather" , "season"]
const set6 = ["name", "call"]
const set7 = ["I", "me", "my"]
const set8 = ["hi", "hello"]

module.exports = function (controller) {
    var result = {} ;

    const trigger = (text) => {
        result = {
            success1 : text.includes("how are you") || text.includes("are you fine") , 
            success2 :  andTest(text, [set2, set3]) , 
            success3 : andTest(text,  [set3, set4, set5]), 
            success4 : andTest(text, [set3, set6]), 
            success5 : andTest(text, [set7,where_syn]) , 
            success6: andTest(text, [set3, where_syn]),
            success7: andTest(text, set8),
        }
           
        return result; 
    } ; 

    controller.hears (async (message) => trigger(message.text) && result.success1 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "Oh, thank you, darling, you're so lovely 😚 I'm good!") ; 
    });

    controller.hears (async (message) => trigger(message.text) && result.success2 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "I' a'm not hungry, but I like ice cream 🤤") ; 
    });

    controller.hears (async (message) => trigger(message.text) && result.success3 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "Put me in summer and I'll be a — happy snowman! 🥴") ; 
    });

    controller.hears (async (message) => trigger(message.text) && result.success4 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message, "I am Olaf, the only snowman ⛄ in Summer ⛱");
    });

    controller.hears (async (message) => trigger(message.text) && result.success5 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "You are in the Fantasylanddddd!") ;
    });

    controller.hears (async (message) => trigger(message.text) && result.success6 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "I'm always with you, darling 😚") ; 
    });

    controller.hears(async (message) => trigger(message.text) && result.success7, 'message,direct_message,direct_mention', async (bot, message) =>
    {
        await bot.reply(message , "Hi, friend!") ; 
    });

}