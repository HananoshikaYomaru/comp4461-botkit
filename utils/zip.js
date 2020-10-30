
// zip return array 
const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);

const assignOne = (keys , values ) =>  Object.assign({}, ...keys.map((n, index) => ({[n]: values[index]}))) ; 


function assign (keys , arrayOfarray) { 
    result = []
    for( i = 0 ; i < arrayOfarray.length ; i++ ){
        array = arrayOfarray[i]
        // console.log(array) 
        temp = assignOne(keys , array )
        // console.log(temp)
        result.push(temp )
        // console.log(result )
    }
        
    return result 
} 


//return array of array
// [[1, "a"], [2, "b"], [3, "c"]]

module.exports = {
    zip : zip, 
    assign : assign , 
    assignOne : assignOne , 
}