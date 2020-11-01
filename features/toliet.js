const { BotkitConversation } = require('botkit');
const {andTest} = require("../utils/condition")
const {zip , assign } = require("../utils/zip") ; 
const { where_syn } = require("../const/question_syn") ;
const { show_syn } = require("../const/command_syn") ;

toliet_syn = ["toliets" , "washroom" , "toliet" , "washrooms" , "restroom" , "restrooms"]

module.exports = function(controller) { 
    const getBotReply = (key) => {
        if (key == "location") 
            return {
                text : "let me show you all the restrooms in disney", 
                files : [{
                    url : "img/toliet.png" ,
                    image: true 
                }]
            }
    } 
    trigger_result = {} 
    const trigger = (text) => { 
        success1 = andTest (text , [toliet_syn , where_syn] ) || andTest(text, [toliet_syn, show_syn])
        trigger_result =  {
            success : success1 , 
            success1  : success1 , 
            options : {} , 
        }
        return trigger_result 
    } 
    controller.hears(async(message) => trigger(message.text) && trigger_result.success, 
    'message,direct_message,direct_mention' , async(bot, message) => {
        if (trigger_result.success1)
            await bot.reply (message, getBotReply("location")) ;
    })
}