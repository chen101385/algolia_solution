const { mergedData } = require('./fileMerge'),
    algoliasearch = require('algoliasearch')
    KEY = require('../../../API/API_KEY'),
    client = algoliasearch('TGMMPVICOC', KEY.API_KEY),
    index = client.initIndex('restaurants');

    index.addObjects(mergedData, (err, content) => {
        if (err) console.log('error in adding objects :', err);
        else console.log('objects were successfully added!:', content);
    });




