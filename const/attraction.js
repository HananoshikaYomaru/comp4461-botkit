const attractions = { 
    "Jungle River Cruise" : {
        location : "Adventureland", 
        hours : "10:30 AM to 7:30 PM" , 
        img : "img/jungle_river_cruise.png" , 
        waiting_time : "20 mins" ,  
    },  
    "Liki Tikis" : {
        location : "Adventureland" , 
        hours : "10:30 AM to 7:30 PM",
        img : "img/liki_tikis.png" , 
        waiting_time : "20 mins" ,
    },
    "Cinderella Carousel" : {
        location : "Fantasyland" , 
        hours : "10:30 AM to 7:30 PM" , 
        img : "img/cinderella_carousel.png", 
        waiting_time : "20 mins" , 
    }, 
    "Dumbo the Flying Elephant" : {
        location : "Fantasyland" , 
        hours : "10:30 AM to 7:30 PM" , 
        img : "img/dumbo_the_flying_elephant.png", 
        waiting_time : "20 mins"
    }, 
    "Fairy Tale Forest" : {
        location : "Fantasyland" , 
        hours : "10:30 AM to 6:00 PM" , 
        img : "img/fairy_tale_forest.png", 
        waiting_time : "20 mins"
    }, 
    "it's a small world" : {
        location : "Fantasyland" , 
        hours : "11:00 AM to 7:30 PM" , 
        img : "img/small_world.png", 
        waiting_time : "20 mins"
    }, 
    "The Many Adventures of Winnie the Pooh" : {
        location : "Fantasyland" , 
        hours : "10:30 AM to 7:30 PM" , 
        img : "img/winnie_the_pooh.png", 
        waiting_time : "20 mins"
    }
}

const attraction_keys = Object.keys(attractions)

const attraction_syn = ["attraction", "game", "attractions" , "games"]

module.exports  = { 
    attractions : attractions , 
    attraction_keys : attraction_keys , 
    attraction_syn : attraction_syn
} ; 