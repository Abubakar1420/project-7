const express = require('express');
const socket = require('socket.io');

//App setup

const app = express();
const PORT = 7000;
const server = app.listen(PORT, () => {
    console.log(`Listening to request from http://localhost:${PORT}`);
} )

// stati files
app.use(express.static('public'));

//socket setup 
const io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})