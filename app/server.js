require('dotenv/config');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const server = express();

// Config
server.use(cors());
server.use(express.json({limit:1024*1024*20, type:'application/json'}));
server.use(routes);
server.use('/uploads', express.static(process.cwd() + '/uploads'))

// Start
server.listen(process.env.PORT || 3333);