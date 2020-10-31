const { BotkitConversation } = require('botkit');
const {zip , assign} = require("../utils/zip") ; 
const {andTest} = require("../utils/condition"); 
const {where_syn } = require("../const/question_syn") ; 

const set1 = ["how are you" , "are you fine"]
const set2 = ["hungry" , "starving" , "food"]
const set3 = ["you" , "olaf"]
const set4 = ["favourite" , "like" , "enjoy" , "love"]
const set5 = ["weather" , "season"]
const set6 = ["name", "call"]
const set7 = ["I" , "me" , "my"] 

module.exports = function (controller ) {
    var result = {} ;

    const trigger = (text) => {
        result = {
            success1 :  andTest(text, [ set1 ]) , 
            success2 :  andTest(text, [set2, set3]) , 
            success3 : andTest(text,  [set3, set4, set5]), 
            success4 : andTest(text, [set3, set6]), 
            success5 : andTest(text, [set7,where_syn]) , 
            success6 : andTest(text , [set3, where_syn])
        }
           
        return result; 
    } ; 

    controller.hears (async (message) => trigger(message.text) && result.success1 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "Oh...😚 you are so lovely, I am fine") ; 
    });

    controller.hears (async (message) => trigger(message.text) && result.success2 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "I am not hungry, but I like ice cream 🤤") ; 
    });

    controller.hears (async (message) => trigger(message.text) && result.success3 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "put me in summer and I'll be a — happy snowman! 🥴") ; 
    });

    controller.hears (async (message) => trigger(message.text) && result.success4 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "I am Olaf, the only snowman ⛄ in Summer ⛱") ; 
    });

    controller.hears (async (message) => trigger(message.text) && result.success5 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "You are in the Fantasyland") ; 
    });

    controller.hears (async (message) => trigger(message.text) && result.success6 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "I am always with you sweetie 😚") ; 
    });

}