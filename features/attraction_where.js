const { BotkitConversation } = require('botkit');
const { attractions }  = require ("../const/attraction" ) ; 
const {zip , assign} = require("../utils/zip") ; 
// import BotkitConversation from "botkit" ; 
// import attractions from "../const/attraction" ; 

module.exports = function (controller) {
    let convo = new BotkitConversation("attraction_where" , controller) ; 

    const getLocation = (name ) => {
        // proposition = "over" 
        // location = "there"
        proposition = "at"
        location = attractions[name]["location"] 
        return [proposition, location]. join(' ')
    }

    const getUserLocation = () => { 
        proposition = "at"
        location = "<your location>"
        return [proposition , location] . join() ; 
    } 

    const getMap = (userLocation , destination) => { 
        return {
            // url: 'https://i1.wp.com/www.dignited.com/wp-content/uploads/2020/04/Google-Docs-Header-1280x720-1.png?fit=1280%2C720&ssl=1',
            url : attractions[destination]["img"],
            image: true
        }
    }

    var result = {} ;

    const trigger = (text) => {
        console.log("trigger is called ") ; 
        keys = [] 
        Object.keys(attractions).forEach(item => {
            if(text.includes(item))
                keys.push(item)  ; 
        })
        result = {
            success : ["attraction", "where"].every(item => text.toLowerCase().includes(item)) , 
            options : {
                keys : keys , 
            } 
        }
        console.log(result.success) 
        console.log(result.options.keys)
        return result; 
    } ; 

    // convo.say("{{vars.something}}")

    convo.addAction("main")
    
    convo.before("main", async(convo , bot ) => {

        if(result.options.keys.length != 0 )
            convo.addAction("direct")
        
    })

    qt1 =  {
        text : "Which attraction?" , 
        quick_replies : [
            {
                "title" :"Jungle River Cruise",
                "payload" : "Jungle River Cruise"
            }
        ]
    }

    //assign(["title", "payload"], zip(Object.keys(attractions), Object.keys(attractions)))

    convo.addQuestion(qt1, async(response, convo, bot) => {
        
        // do something? for example process response 
        // console.log (response) // response is a string 
        console.log(qt1.quick_replies)
        name = response
        convo.setVar("attraction_name" , name)


        userlocation = getUserLocation() ; 
        destination = getLocation (name) 
        botreply = {
            text : "Now your are " + userlocation + ", {{vars.attraction_name}} is " + destination  , 
            files : [getMap(userlocation , name )]
        }
        convo.say(botreply)
    }, {}, "main");

    convo.addMessage("now in direct thread", "direct")


    convo.after (async ( result , bot ) => {
        console.log("convo ended")
    })

    controller.addDialog(convo) ; 

    controller.hears( async(message) => trigger(message.text) && result.success , 'message,direct_message,direct_mention', async(bot, message) => {
        await bot.beginDialog('attraction_where', keys);
    });

}