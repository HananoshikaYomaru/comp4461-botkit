const { BotkitConversation } = require("botkit");

module.exports = function(controller) {

    const dialog_id = "shop" ; 
    let convo = new BotkitConversation("shop" , controller ) ; 
    convo.say("shop conversation...") ; 
    // convo.setVar('kk','bar');
    // console.log(convo.getVar); 
    controller.addDialog(convo) ; 

}