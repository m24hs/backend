const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


const server = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
mongoose.set('debug', true);

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3333);