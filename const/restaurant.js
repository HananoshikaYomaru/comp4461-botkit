const restaurants = {
	"Royal Banquet Hall": {
		location: "Fantasyland",
		cuisine: "International",
		hours: "11:30 AM to 7:30 PM",
		img: "img/Restaurant__royal_banquet_hall.png",
		waiting_time: "20 mins",
	},
	"Main Street Corner Cafe": {
		location: "Main Street, U.S.A.",
		cuisine: ["vegetarian", "Western"],
		hours: "11:00 AM to 8:00 PM",
		img: "img/Restaurant__main_street_corner_cafe.png",
		waiting_time: "20 mins",
	},
	"Plaza Inn": {
		location: "Main Street, U.S.A.",
		cuisine: ["Chinese", "vegetarian"],
		hours: "10:30 AM to 8:00 PM",
		img: "img/Restaurant__plaza_inn.png",
		waiting_time: "20 mins",
	},
	"Starliner Diner": {
		location: "Tomorrowland",
		cuisine: "Western",
		hours: "11:30 AM to 7:30 PM",
		img: "img/Restaurant__starliner_diner.png",
		waiting_time: "20 mins",
	},
	"River View Cafe": {
		location: "Adventureland",
		cuisine: "Chinese",
		hours: "10:30 AM to 7:30 PM",
		img: "img/Restaurant__river_view_cafe.png",
		waiting_time: "20 mins",
	},
	"Clopin's Festival of Foods": {
		location: "Fantasyland",
		cuisine: ["Chinese", "vegetarian"],
		hours: "10:30 AM to 7:30 PM",
		img: "img/Restaurant__clopins_festival_of_foods.png",
		waiting_time: "20 mins",
	},
	"Comet Cafe": {
		location: "Tomorrowland",
		hours: "10:30 AM to 7:30 PM",
		img: "img/Restaurant__comet_cafe.png",
		waiting_time: "20 mins",
	}
};

const restaurant_keys = Object.keys(restaurants);

const restaurant_syn = [
	"dine", "dining",
	"eat", "eating",
	"food",
	"hangry", "hungry",
	"meal", "meals",
	"restaurant", "restaurants",
	"snack", "snacks",
	"starved", "starving",
	"stomach",
];

module.exports  = { 
	restaurants: restaurants, 
	restaurant_keys: restaurant_keys, 
	restaurant_syn: restaurant_syn
};