// set is an array 
const andTest = (text ,sets) => {
    for (i = 0 ; i < sets.length ; i++){
        // console.log(sets[i])
        if(!sets[i].some(item => text.toLowerCase().includes(item.toLowerCase())))
            return false ;
        // console.log(true)
    }
    return true ; 
} 

module.exports = {
    andTest : andTest ,
}