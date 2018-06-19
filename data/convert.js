const readline = require('readline')
const fs = require('fs');

const reader = readline.createInterface({
    input: fs.createReadStream('restaurants_info.csv'),
});

let line = 0;
let keys;

reader.on('line', (data) => {
    if (line === 0) {
        keys = data.split(';');
        line++;
    } else {
        const values = data.split(';');
        const info = keys.reduce((acc, key, index) => {
            acc[key] = values[index];
            return acc;
        }, {});
        fs.appendFile('restaurants_info.json', `${JSON.stringify(info)}\n`, (err) => {
            if (err) {
                throw err;
            }
        });
    }
});

reader.on('error', (error) => console.log('this is the error message:', error))