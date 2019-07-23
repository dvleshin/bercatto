
const socketIO = require('socket.io');
const roomService = require('./room-service');
const messageService = require('./message.service');

var io;
var activeUsersCount = 0;

function setup(http) {
    io = socketIO(http);
    io.on('connection', async function (socket) {
        console.log('a user connected');
        const msgs = await messageService.getById('QgPkZv')
            console.log('Messages:', msgs);
            

        var room;
        activeUsersCount++;

        socket.on('disconnect', () => {
            console.log('user disconnected');
            activeUsersCount--;
        });

        socket.on('chat join', (arenaId) => {
            socket.emit('chat history', [{txt: arenaId}]);

            // room = roomService.placeInRoom(arenaId)
            // console.log('Placed', user, 'in room:', room);
            // socket.join(room.id);
        });

        socket.on('chat msg', (msg) => {
            console.log('message: ' + msg.txt);
            // io.to().emit('chat newMsg', msg);
            io.emit('chat newMsg', msg);
        });
        socket.on('arena itemSelected', () => {
            io.emit('arena itemSelected');
        });
    });
}

module.exports = {
    setup ,
    io
}


