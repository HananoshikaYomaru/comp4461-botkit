const { BotkitConversation } = require('botkit');
const { shows, show_keys, show_syn } = require("../const/show");
const { where_syn, when_syn } = require("../const/question_syn");
const { zip, assign } = require("../utils/zip");
const { andTest } = require("../utils/condition");

//===============================================================

module.exports = function (controller)
{
//show-where
	const SHOW_WHERE = "show_where";
	let show_where = new BotkitConversation(SHOW_WHERE, controller); 


	show_where.ask(
		{
			text: "Which show?",
			quick_replies:
				assign(["title", "payload"], zip(show_keys, show_keys))
		}, [], "destination");
	
	
	controller.afterDialog(SHOW_WHERE, async (bot, results) =>
	{
        await bot.say(getBotReply(results.destination, SHOW_WHERE)); 
	});
	
	controller.addDialog(show_where);

//show-schedule
	const SHOW_SCHEDULE = "show_schedule";
	let show_schedule = new BotkitConversation(SHOW_SCHEDULE, controller);
	

	show_schedule.ask(
		{
			text: "Which show?",
			quick_replies: assign(["title", "payload"], zip(show_keys, show_keys))
		}, [], "destination");
	
	
	controller.afterDialog(SHOW_SCHEDULE, async (bot, results) =>
	{
        await bot.say(getBotReply(results.destination, SHOW_SCHEDULE));
	});
	
	controller.addDialog(show_schedule);

//===============================================================

	const getBotReply = (destination, convo_id) =>
	{
		if (convo_id == SHOW_WHERE)
			return {
				text: `Now you are at the red spot. ${destination} is at ${shows[destination]['location']}`,
				files:
				{
					url: shows[destination]["img"],
					image: true
				}
			};
		
		function scheduleDisplay(strings, schedule)
		{
			var 
			for (i = 0; i < schedule.length(); i++)
				
			return `${strings[0]}`;
		}
		if (convo_id == SHOW_SCHEDULE)
			return `This is the schedule for "${destination}" today: ${shows[destination]['schedule']}`;
    } 

	var result = {};

	const trigger = (text) =>
	{
		keys = [];

		show_keys.forEach(item =>
		{
            if(text.includes(item))
                keys.push(item); 
        })
		
		success_syn_where = andTest(text, [show_syn, where_syn]);
		success_key_where = andTest(text, [show_keys, where_syn]);
		success_syn_queue = andTest(text, [show_syn, when_syn]);
		success_key_queue = andTest(text, [show_keys, when_syn]);

		result = {
			success_syn_where: success_syn_where,
			success_key_where: success_key_where,
			success_syn_queue: success_syn_queue,
			success_key_queue: success_key_queue,
			options:
			{
				keys: keys,
			}
		}
        return result; 
	};

//===============================================================

// where
	controller.hears(async (message) => trigger(message.text) && result.success_syn_where,
	"message, direct_message, direct_mention",
		async (bot, message) =>
	{
        await bot.beginDialog(SHOW_WHERE);
    });

	controller.hears(async (message) => trigger(message.text) && result.success_key_where,
	"message, direct_message, direct_mention",
		async (bot, message) =>
	{
		keys = result.options.keys;
		destination = keys[0];
		await bot.reply(message, getBotReply(destination, SHOW_WHERE));
    });


// schedule
	controller.hears(async (message) => trigger(message.text) && result.success_syn_queue,
		"message, direct_message, direct_mention",
		async (bot, message) =>
	{
		await bot.beginDialog(SHOW_SCHEDULE);
	});

	controller.hears(async (message) => trigger(message.text) && result.success_key_queue,
		"message, direct_message, direct_mention",
		async (bot, message) =>
	{
		keys = result.options.keys;
		destination = keys[0];
		await bot.reply(message, getBotReply(destination, SHOW_SCHEDULE));
	});
}