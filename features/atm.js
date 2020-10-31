const { BotkitConversation } = require('botkit');
const {andTest} = require("../utils/condition")
const {zip , assign } = require("../utils/zip") ; 
const { what_syn} = require("../const/question_syn") ;

atm_syn = ["atm" , "cash" , "money" , "bank", "atms" , "banks"]

module.exports = function(controller) { 
    const getBotReply = (key) => {
        if (key == "location") 
            return {
                text : "let me show you all the atms in disney", 
                files : [{
                    url : "img/atm.png" ,
                    image: true 
                }]
            }
        if ( key == "card")
            return "Visa \nPlus \n MasterCard \nCirrus \nJetco \nUnionPay" 
    } 
    trigger_result = {} 
    const trigger = (text) => { 
        success1 = andTest (text , [atm_syn])
        success2 = andTest(text, [what_syn , atm_syn, ["card"]])
        trigger_result =  {
            success : success1 || success2, 
            success1  : success1 , 
            success2 : success2, 
            options : {} , 
        }
        return trigger_result 
    } 
    controller.hears(async(message) => trigger(message.text) && trigger_result.success, 
    'message,direct_message,direct_mention' , async(bot, message) => {
        if(trigger_result.success2 ) 
        {
            await bot.say("Em.... Ah, disney now accept following cards ") ; 
            await bot.say(getBotReply("card")) ; 
        } 
        else if (trigger_result.success1)
            await bot.reply (message, getBotReply("location")) ;
    })
}