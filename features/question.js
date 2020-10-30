const { BotkitConversation } = require("botkit");

module.exports = function(controller) {
    const dialog_id = "start" ; 
    let convo = new BotkitConversation("start" , controller ) ; 

    convo.say ("Hi, I am DisneyBot") ;  
    convo.ask('What is your name?', async(response, convo, bot) => {
        console.log(`user name is ${ response }`);
        // do something?
    }, 'name');

    // use add action to switch to a different thread, defined below...
    convo.addAction('favorite_color');

    convo.say("{{vars}}") ; 
    // add a message and a prompt to a new thread called `favorite_color`
    convo.addMessage('Awesome {{vars.name}}!', 'favorite_color');
    convo.addQuestion('Now, what is your favorite color?', async(response, convo, bot) => {
        console.log(`user favorite color is ${ response }`);
    },'color', 'favorite_color');

    // go to a confirmation
    convo.addAction('confirmation' ,'favorite_color');

    // do a simple conditional branch looking for user to say "no"
    convo.addQuestion('Your name is {{vars.name}} and your favorite color is {{vars.color}}. Is that right?', [
        {
            pattern: 'no',
            handler: async(response, convo, bot) => {
                // if user says no, go back to favorite color.
                await convo.gotoThread('favorite_color');
            }
        },
        {
            default: true,
            handler: async(response, convo, bot) => {
                // do nothing, allow convo to complete.
            }
        }
    ], 'confirm', 'confirmation');

    controller.addDialog(convo) ; 
}