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
        if (item.objectID === arr2[index].objectID.toString()) result.push(Object.assign({}, item, arr2[index]))
        else console.log('JSON data is not properly aligned')
    });

    return result;
}

//merge two JSON datasets 
const mergedData = mergeJSON(restaurants_info, restaurants_list);

module.exports = {
    mergedData,
}