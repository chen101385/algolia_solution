const readline = require('readline')
const fs = require('fs');

const reader = readline.createInterface({
    input: fs.createReadStream('restaurants_info.csv'),
});

let line = 0;
let keys;

reader.on('open', () => fs.appendFile('restaurants_info.json', `[`, err => {
    if (err) {
        throw err;
    }
}));

fs.appendFile('restaurants_info.json', `[`, err => {
    if (err) {
        throw err;
    }
})

let sep = "";

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
        if (line === 1) {
            fs.appendFile('restaurants_info.json', `${JSON.stringify(info)}`, err => {
                if (err) {
                    throw err;
                }
            });
            line++;
        } else {
            if (!sep) {
                sep = ",\n";
            }
            fs.appendFile('restaurants_info.json', `${sep}${JSON.stringify(info)}`, err => {
                if (err) {
                    throw err;
                }
            });
        }
    }
});

reader.on('close', () => fs.appendFile('restaurants_info.json', `]`, err => {
    if (err) {
        throw err;
    }
}));