const express = require('express');
const app = express();
const path = require('path')
const server = require('http').Server(app);
// const io = require('socket.io').listen(server);
const router = require('./routes/router')
server.listen(process.env.PORT || '8090');

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

//     next()
// })

app.use(express.static(path.join(__dirname, 'client/build')));
// app.use(express.static(path.join(__dirname, 'client')))
app.use(router);

// io.sockets.on('connection', (socket) => {
//     console.log('connected!');
//     socket.emit('test', 'testing');

//     socket.on('texts', (data) => {
//         console.log(data);
//     })
// })

