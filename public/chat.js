//make connection
const socket = io.connect('http://localhost:7000');

//querry DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Emit Events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

message.addEventListener('keypress', () =>{ 
    socket.emit('typing', handle.value)
})
// listen for Event
socket.on('chat', (data) => {
    feedback.innerHTML = ""
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data+ ' is typing a message...</em></p>';
})