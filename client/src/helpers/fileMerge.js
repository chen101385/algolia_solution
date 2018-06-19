const restaurants_info = require('../../../data/restaurants_info.json');
const restaurants_list = require('../../../data/restaurants_list.json');

//sorting function for objectID in ascending order   
const sort = arr => {
    arr.sort((a, b) => {
        return a.objectID - b.objectID
    })
};

//sort both JSON files by objectID to align prior to merge
sort(restaurants_info);
sort(restaurants_list);

const mergeJSON = (arr1, arr2) => {
    let result = [];

    arr1.forEach((item, index) => {
        result.push(Object.assign({}, item, arr2[index]))
    });

    return result;
}

// Testing For Fidelity
// console.log('index 10 info:', restaurants_info[10]);
// console.log('index 10 list:', restaurants_list[10]);
// console.log('merged array @ index 10', mergedArray[10]);

let mergedData = mergeJSON(restaurants_info, restaurants_list);

module.exports = {
    mergedData
}
