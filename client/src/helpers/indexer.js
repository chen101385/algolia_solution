const {
  mergedData,
} = require('./fileMerge');
const algoliasearch = require('algoliasearch');
const KEY = require('../../../API/API_KEY');

const client = algoliasearch('TGMMPVICOC', KEY.API_KEY);
const index = client.initIndex('restaurants');

index.addObjects(mergedData, (err, content) => {
  if (err) console.log('error in adding objects :', err);
  else console.log('objects were successfully added!:', content);
})