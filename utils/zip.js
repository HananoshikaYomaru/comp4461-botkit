const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);

const assign = (keys, valuesSet) => {
    result = {} 
    for (values in valuesSet)
        result = {
            ...result , 
            ...Object.assign({}, ...keys.map((n, index) => ({[n]: values[index]})))
        }
    return result 
} ; 


//return array of array
// [[1, "a"], [2, "b"], [3, "c"]]

module.exports = {
    zip : zip, 
    assign : assign 
}