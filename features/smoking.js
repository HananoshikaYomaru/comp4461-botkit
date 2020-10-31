const { BotkitConversation } = require('botkit');
const { smoking , smokingArea , smoking_syn}  = require ("../const/smoking" ) ; 
const {zip , assign } = require("../utils/zip") ; 
const {andTest} = require("../utils/condition")
const {where_syn , number_syn} = require("../const/question_syn") ; 

module.exports = function(controller) { 
    const SMOKING_WHERE = "smoking_where"
    const SMOKING_NUMBER = "smoking_number"
    let smoking_where = new BotkitConversation(SMOKING_WHERE , controller) ; 
    smoking_where.ask({
        text : "which location ? " , 
        quick_replies : assign(["title", "payload"] , zip(smokingArea , smokingArea))
    }, [] , "location") ; 
    const getBotReply = (location) => {
        files = [] 
        for( i = 0 ; i < smoking[location].length ; i++ ){
            files.push(
                {
                    url: smoking[location][i]["img"] , 
                    image : true 
                }
            )
        }
        return  {
            text : `there are ${smoking[location].length} smoking area in ${location}`  , 
            files : files
        }
    } 
    controller.afterDialog(SMOKING_WHERE , async(bot, results) => {
        await bot.say(getBotReply(results.location)); 
    })

    var result = {} ;  
    const trigger = (text ) => {
        success1 = andTest(text, [smoking_syn , where_syn]) ;
        success2 = andTest(text, [smoking_syn , number_syn]) ; 
        result = {
            success1: success1 , 
            success2 : success2 ,  
        }
        return result 
    } 

    controller.addDialog(smoking_where);  

    controller.hears(async(message) => trigger(message.text) && result.success1  , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.beginDialog(SMOKING_WHERE);
    })

    controller.hears(async(message) => trigger(message.text) && result.success2  , 'message,direct_message,direct_mention', async(bot, message) => {
        
        await bot.reply(message , "there are 5 smoking areas in Disney") ; 
    })

}