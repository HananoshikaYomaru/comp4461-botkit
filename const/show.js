const shows = {
	"Festival of the Lion King": {
		location: "Adventureland",
		schedule: [
			"12:00 PM",
			"2:00 PM",
			"4:30 PM",
			"6:00 PM"
		],
		img: "img/Show__festival_of_the_lion_king.png",
	},
	"Moana: A Homecoming Celebration": {
		location: "Adventureland",
		schedule: [
			"12:55 PM",
			"2:10 PM",
			"4:15 PM",
			"5:30 PM"
		],
		img: "img/Show__moana_homecoming.png",
	},
	"Mickey and the Wondrous Book": {
		location: "Fantasyland",
		schedule: [
			"11:15 AM",
			"12:30 PM",
			"1:45 PM",
			"4:30 PM",
			"5:45 PM",
			"7:00 PM"
		],
		img: "img/Show__mickey_and_book.png",
	},
	"Jedi Training: Trials of the Temple": {
		location: "Tomorrowland",
		schedule: [
			"12:30 PM",
			"2:45 PM",
			"4:15 PM",
			"5:30 PM"
		],
		img: "img/Show__jedi.png",
	},
};

const show_keys = Object.keys(shows);

const show_syn = [
	"entertainment",
	"show", "shows",
	"performance", "performances"
];

module.exports  = { 
	shows: shows, 
	show_keys: show_keys, 
	show_syn: show_syn
};