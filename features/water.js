const { BotkitConversation } = require('botkit');
const {zip , assign , getKey, find } = require("../utils/zip") ; 
const {andTest} = require("../utils/condition")
const {where_syn , number_syn} = require("../const/question_syn") ; 
const {area} = require ("../const/area")

water = [
    {
        area :"Tomorrowland" , 
        location : "Hyperspace Mountain",  
        img : "img/water1.png"
    }, 
    {
        area : "Fantasyland", 
        location : "Royal Banquet Hall" , 
        img : "img/water2.png"
    }
]

water_area = getKey(water, "area")
water_syn = ["water" ,  "thirsty" , "bottle" , "dispenser"]



module.exports = function(controller) {
    const WATER = "water"
    let convo = new BotkitConversation (WATER , controller ) 
    convo.say("Water is important is important for human!!!! No worries.") 
    convo.ask ({
        text : "which area? " , 
        quick_replies : assign(["title" , "payload"] , zip(water_area , water_area))
    } , [], "area")
    controller.afterDialog(WATER , async(bot, results) => {
        await bot.say(getBotReply(results.area, trigger_result.options.keys)); 
    })
    controller.addDialog(convo) ; 

     // -----------------------------------------------------------

    const getBotReply = (area , key ) => {
        if (key == "where" ) {
            return {
                text : `Water diespenser is at ${find(water, "area" , area ,  "location")}` , 
                files : {
                    url : find(water, "area" , area ,  "img"), 
                    image: true 
                }
            }
        }
        if (key == "number") {
            count= 0 ; 
            for(i = 0 ; i < water.length ; i++ )
                if(water[i]["area"] == area)
                    count++ ; 
            return `There are ${count} water dispenser in ${area}`
        }
    } 

     trigger_result = {} 
     const trigger = (text) => { 
         trigger_result =  {
             success1  : andTest (text , [water_syn , where_syn ]) , 
             success2 : andTest(text , [water_syn , number_syn] ) , 
             success3 : andTest(text, [area , water_syn , where_syn] ) , 
             success4 : andTest(text , [area , water_syn , number_syn ] ) , 
             options : {} 
         }
         return trigger_result 
     } 
 
     controller.hears(async(message) => trigger(message.text) && trigger_result.success1 && !trigger_result.success3 , 
     'message,direct_message,direct_mention' , async(bot, message) => {
         trigger_result.options = {keys : "where"}
         await bot.beginDialog(WATER);
     })
 
     controller.hears(async(message) => trigger(message.text) && trigger_result.success2 && !trigger_result.success4 , 'message,direct_message,direct_mention', async(bot, message) => {
        trigger_result.options = {keys : "number"}
        await bot.beginDialog(WATER);
     })  ; 

     controller.hears(async(message) => trigger(message.text) && trigger_result.success3 , 'message,direct_message,direct_mention', async(bot, message) => {
        for( i = 0 ; i < water.length ; i++ )
            if(message.text.includes(water[i]["area"]) )
                await bot.reply(message , getBotReply(water[i]["area"] ,"where"))
     })  ; 

}