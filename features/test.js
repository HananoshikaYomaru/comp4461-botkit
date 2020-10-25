module.exports = function(controller) {

    controller.hears('hello','message',async(bot, message) => {
        // do something!
        await bot.reply(message, 'Hello human')
    });

    controller.hears('hello','direct_message', function(bot, message) {
        bot.reply(message,'Hello yourself!');
    });
}