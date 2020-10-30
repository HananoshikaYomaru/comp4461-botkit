const smoking = {
    "Mystic Point" : [{ 
        location : "Explorer’s Club Restaurant, Mystic Point" , 
        img : "img/smoking1.png"
    }], 
    "Grizzly Gulch" :[ {
        
        location : "Grizzly Gulch", 
        img : "img/smoking2.png"
    }], 
    "Fantasyland" : [{
         
        location : "Fairy Tale Forest, Fantasyland" , 
        img : "img/smoking3.png"
    },
    {
        
        location : "Disney’s Storybook Theater, Fantasyland", 
        img : "img/smoking5.png"
    }],  
    "Adventureland" : [{
        
        location : "Tahitian Terrace, Adventureland", 
        img : "img/smoking4.png"
    }] 
}

const smokingArea = Object.keys(smoking)

const smoking_syn = ["smoking" , "smoke"]
module.exports = {
    smoking : smoking , 
    smokingArea : smokingArea , 
    smoking_syn : smoking_syn , 
} 