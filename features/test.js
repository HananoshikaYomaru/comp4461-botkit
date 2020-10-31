const { BotkitConversation } = require("botkit");
const {assignOne ,zip , assign } = require("../utils/zip")

module.exports = function (controller) { 
    let test1 = new BotkitConversation("test" , controller ) ; 

    test1.ask('What is your name?', [], 'name');
    test1.say('{{vars.name}}')

    let test2 = new BotkitConversation("test" , controller ) ; 

    test2.ask('test2?', [], 'name');
    test2.say('test2')

    test1.addChildDialog(test2 , 'test2')

    controller.addDialog(test1) ; 
    controller.addDialog(test2) ; 


    controller.hears( "test" , 'message,direct_message,direct_mention', async(bot, message) => {
        console.log (assignOne(["test1"  , "test2"] , [1,2]))
        temp = zip(["test1" , "test2"] , ["a" , "b"])
        console.log(temp)
        console.log(assign(["test1" , "test2"] , temp ))
        await bot.beginDialog("test")
    });
}