

const blackList_words = ["i","hi",'it',"thx" ].map(item => item.toLowerCase())

const andTest = (text ,sets) => {
    text = text.toLowerCase().replace (',', ' ').replace('.' , ' ') .replace('?' , ' ').replace('!' , ' '); 
    temp = text.split(" ")  ;
    // console.log(temp)
    for (i = 0 ; i < sets.length ; i++){
        // console.log(sets[i])
        tempSet = sets[i].map(item => item.toLowerCase() )
        if(!tempSet.some(item => (blackList_words.includes(item) && temp.some(item2=>item==item2)) || (!blackList_words.includes(item) && text.includes(item))))
            return false ;
        // console.log(true)
    }
    return true ; 
} 

module.exports = {
    andTest : andTest ,
}