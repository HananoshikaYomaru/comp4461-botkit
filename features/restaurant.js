const { BotkitConversation } = require('botkit');
const { restaurants, restaurant_keys, restaurant_syn } = require("../const/restaurant");
const { what_syn, where_syn, queue_syn } = require("../const/question_syn");
const { zip, assign } = require("../utils/zip");
const { andTest } = require("../utils/condition");

//===============================================================

module.exports = function (controller)
{
//restaurant-where
	const RESTAURANT_WHERE = "restaurant_where";
	let restaurant_where = new BotkitConversation(RESTAURANT_WHERE, controller); 


	restaurant_where.ask(
		{
			text: "Which restaurant?",
			quick_replies:
				assign(["title", "payload"], zip(restaurant_keys, restaurant_keys))
		}, [], "destination");
	
	
	controller.afterDialog(RESTAURANT_WHERE, async (bot, results) =>
	{
        await bot.say(getBotReply(results.destination, RESTAURANT_WHERE)); 
	});
	
	controller.addDialog(restaurant_where);

//restaurant-queue
	const RESTAURANT_QUEUE = "restaurant_queue";
	let restaurant_queue = new BotkitConversation(RESTAURANT_QUEUE, controller);
	

	restaurant_queue.ask(
		{
			text: "Which restaurant?",
			quick_replies: assign(["title", "payload"], zip(restaurant_keys, restaurant_keys))
		}, [], "destination");
	
	
	controller.afterDialog(RESTAURANT_QUEUE, async (bot, results) =>
	{
        await bot.say(getBotReply(results.destination, RESTAURANT_QUEUE));
	});
	
	controller.addDialog(restaurant_queue);

//===============================================================

	const getBotReply = (destination, convo_id) =>
	{
		if (convo_id == RESTAURANT_WHERE)
			return {
				text: `Now you are at the red spot. ${destination} is at ${restaurants[destination]['location']}`,
				files:
				{
					url: restaurants[destination]["img"],
					image: true
				}
			};
		
		if (convo_id == RESTAURANT_QUEUE)
			return `Waiting time of ${destination} is ${restaurants[destination]['waiting_time']}`;
    } 

	var result = {};

	const trigger = (text) =>
	{
		keys = [];

		restaurant_keys.forEach(item =>
		{
            if(text.includes(item))
                keys.push(item); 
        })
		
		success_syn_where = andTest(text, [restaurant_syn, where_syn]);
		success_key_where = andTest(text, [ where_syn , restaurant_keys]); 
		success_syn_queue = andTest(text, [restaurant_syn, queue_syn]);
		success_key_queue = andTest(text, [restaurant_keys, queue_syn]);

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
        await bot.beginDialog(RESTAURANT_WHERE);
    });

	controller.hears(async (message) => trigger(message.text) && result.success_key_where,
	"message, direct_message, direct_mention",
		async (bot, message) =>
	{
		keys = result.options.keys;
		destination = keys[0];
		await bot.reply(message, getBotReply(destination, RESTAURANT_WHERE));
    });


// queue
	controller.hears(async (message) => trigger(message.text) && result.success_syn_queue,
		"message, direct_message, direct_mention",
		async (bot, message) =>
	{
		await bot.beginDialog(RESTAURANT_QUEUE);
	});

	controller.hears(async (message) => trigger(message.text) && result.success_key_queue,
		"message, direct_message, direct_mention",
		async (bot, message) =>
	{
		keys = result.options.keys;
		destination = keys[0];
		await bot.reply(message, getBotReply(destination, RESTAURANT_QUEUE));
	});
}