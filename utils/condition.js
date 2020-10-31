// set is an array 
const andTest = (text ,sets) => {
    temp = text.split(' ') ; 
    temp = temp.map(v => v.toLowerCase () )
    // console.log(temp)
    for (i = 0 ; i < sets.length ; i++){
        // console.log(sets[i])
        if(!sets[i].some(item => temp.includes(item.toLowerCase())))
            return false ;
        // console.log(true)
    }
    return true ; 
} 

module.exports = {
    andTest : andTest ,
}