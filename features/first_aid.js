const { BotkitConversation } = require('botkit');
const {andTest} = require("../utils/condition")
const {zip , assign } = require("../utils/zip") ; 
const {where_syn , number_syn} = require("../const/question_syn") ; 

first_aid = {
    "Main Street, USA" : {
        img : "img/first_aid1.png"
    } ,
    "Grizzly Gulch" : {
        img : "img/first_aid2.png"
    }
}
first_aid_keys = Object.keys(first_aid)
first_aid_syn = ["first aid" , "medical", "well-being" , "health"]

module.exports = function (controller) { 
    const FIRST_AID_WHERE = "first_aid_where"
    let first_aid_where = new BotkitConversation(FIRST_AID_WHERE, controller )
    first_aid_where.ask({
        text : "which location? " , 
        quick_replies : assign(["title", "payload"] , zip(first_aid_keys , first_aid_keys))
    }, [] , "location") 

    controller.addDialog(first_aid_where) ; 

    controller.afterDialog(FIRST_AID_WHERE , async(bot, results) => {
        await bot.say(getBotReply(results.location)); 
    })
    // -----------------------------------------------------------

    const getBotReply = (location) => {
        return  {
            text : `the first aid location is right here`  , 
            files : {
                url : first_aid[location]["img"] , 
                image : true 
            }
        }
    } 

    result = {} 
    const trigger = (text) => { 
        success1 = andTest (text , [first_aid_syn , where_syn ])
        success2 = andTest(text , [first_aid_syn , number_syn] ) ; 
        result =  {
            success1  : success1 , 
            success2 : success2 , 
        }
        return result 
    } 

    controller.hears(async(message) => trigger(message.text) && result.success1, 
    'message,direct_message,direct_mention' , async(bot, message) => {
        await bot.beginDialog(FIRST_AID_WHERE);
    })

    controller.hears(async(message) => trigger(message.text) && result.success2 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.reply(message , "There are 2 first aid location in Disney.")
    })  ; 
}