const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {
    router
} = require('./routes');

const server = express();
const PORT = process.env.PORT || 4000;

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../client/build')));
server.use(router);
server.listen(PORT, () => console.log(`App is now live at http://localhost:${PORT}`));
