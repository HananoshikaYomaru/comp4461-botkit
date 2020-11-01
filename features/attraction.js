const { BotkitConversation } = require('botkit');
const { attractions , attraction_keys , attraction_syn}  = require ("../const/attraction" ) ; 
const {zip , assign} = require("../utils/zip") ; 
const {where_syn, queue_syn } = require("../const/question_syn") ; 
const {show_syn } = require("../const/command_syn")  ;
const {andTest, andTestNotExact} = require("../utils/condition")

module.exports = function (controller) {

    const ATTRACTION_WHERE = "attraction_where"
    let attraction_where = new BotkitConversation(ATTRACTION_WHERE , controller) ; 
    attraction_where.ask({
        text : "Which attraction?" , 
        quick_replies : assign(["title" , "payload"] , zip(attraction_keys , attraction_keys) )
    }, [] , "destination" );
    controller.afterDialog(ATTRACTION_WHERE , async(bot, results) => {
        await bot.say("No worries dear, let me show you 🤠")
        await bot.say(getBotReply(results.destination, ATTRACTION_WHERE)); 
    })
    controller.addDialog(attraction_where) ; 

    //===============================================================

    const ATTRACTION_QUEUE = "attraction_queue" 
    let attraciton_queue = new BotkitConversation(ATTRACTION_QUEUE , controller );  
    attraciton_queue.ask({
        text : "Which attraction?" , 
        quick_replies : assign(["title" , "payload"] , zip(attraction_keys , attraction_keys) )
    }, [] , "destination" );
    controller.afterDialog(ATTRACTION_QUEUE , async(bot, results) => {
        await bot.say("Seems quite a lot of people there...")
        await bot.say(getBotReply(results.destination, ATTRACTION_QUEUE)); 
    })
    controller.addDialog(attraciton_queue) ; 


    //===============================================================

    const ATTRACTION_INFO = "attraction_info" 
    let attraction_info = new BotkitConversation(ATTRACTION_INFO , controller)  ;
    attraction_info.ask({
        text : "what kind of info do you want to know?", 
        quick_replies : assign(["title" , "payload"] , [["location" , "location"] , ["waiting time" , "waiting time"]])
    }, [
        {
            pattern: "location",
            handler: async(res, convo, bot) => {
                await convo.gotoThread(ATTRACTION_WHERE); 
                // convo
            }
        },
        {
            pattern: "waiting",
            handler: async(res, convo, bot) => {
                await convo.gotoThread(ATTRACTION_QUEUE);
                // convo
            }
        }
    ] , "choice")
    attraction_info.addGotoDialog(ATTRACTION_WHERE, ATTRACTION_WHERE);
    attraction_info.addGotoDialog(ATTRACTION_QUEUE, ATTRACTION_QUEUE);
    controller.addDialog(attraction_info) ; 

    //===============================================================


    const getBotReply = (destination , convo_id) => {
        if(convo_id == ATTRACTION_WHERE)
            return  {
            text : `Now you are at the red spot, ${destination} is at ${attractions[destination]['location']}`   , 
            files : {
                url : attractions[destination]["img"],
                image: true
            }
        }
        if (convo_id == ATTRACTION_QUEUE)
            return `Waiting time of ${destination} is ${attractions[destination]['waiting_time']}`
    } 

    var result = {} ;

    const trigger = (text) => {
        keys = [] 
        attraction_keys.forEach(item => {
            if(text.includes(item))
                keys.push(item)  ; 
        })
        
        success1 = andTest(text, [attraction_syn , where_syn]) ; 
        success2 = andTest(text, [where_syn, attraction_keys]);
        success3 = andTest(text, [attraction_syn , queue_syn ])  ;
        success4 = andTest(text , [queue_syn, attraction_keys])  ;  
        success5 = andTest(text , [attraction_syn,  show_syn ]) ; 

        result = {
            success1 :  success1, 
            success2 : success2, 
            success3 : success3   ,
            success4 : success4 , 
            success5 : success5 , 
            options : {
                keys : keys , 
            } 
        }
           
        return result; 
    } ; 

    controller.hears( async(message) => trigger(message.text) && result.success1 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.beginDialog(ATTRACTION_WHERE);
    });

    // direct 
    controller.hears( async(message) => trigger(message.text) && result.success2 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.say("No worries dear, let me show you 🤠")
        await bot.say(getBotReply(result.options.keys[0], ATTRACTION_WHERE)); 
    });

    controller.hears (async(message) => trigger(message.text) && result.success3 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.beginDialog(ATTRACTION_QUEUE); 
    }) 


    //direct 
    controller.hears (async(message) => trigger(message.text) && result.success4 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.say("Seems quite a lot of people there...")
        await bot.say(getBotReply(result.options.keys[0], ATTRACTION_QUEUE)); 
    }) 

    controller.hears (async(message) => trigger(message.text) && result.success5 , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.beginDialog(ATTRACTION_INFO); 
    }) 

}