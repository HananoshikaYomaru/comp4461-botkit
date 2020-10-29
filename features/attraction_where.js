const { BotkitConversation } = require('botkit');

module.exports = function (controller) {
    let convo = new BotkitConversation("attraction_where" , controller) ; 

    // convo.say("{{vars.something}}")
    convo.ask('Which attraction?', async(response, convo, bot) => {
        
        // do something?
    }, 'attraction_name');


    convo.say("{{vars.attraction_name}} is over there");
    
    controller.addDialog(convo) ; 

    const trigger = (text) => {
        
        return ["attraction", "where"].every(item => text.includes(item)); 
    } ; 

    const getKey = (text) => { 
        return {
            something : text 
        }
    }

    controller.hears(async (message)=> message.text && trigger(message.text), 'message,direct_message,direct_mention', async(bot, message) => {



        if(message.text == "where is attraction abc")
            bot.reply(message, "attraction abc is over there")


        else 
            await bot.beginDialog('attraction_where', getKey(message.text));


    });

}