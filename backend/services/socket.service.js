
const socketIO = require('socket.io');
const roomService = require('./room-service');

var io;
var activeUsersCount = 0;

function setup(http) {
    io = socketIO(http);
    io.on('connection', function (socket) {
        console.log('a user connected');
        var room;
        activeUsersCount++;

        socket.on('disconnect', () => {
            console.log('user disconnected');
            activeUsersCount--;
        });

        socket.on('chat join', (user,arenaId) => {
            // const history = await msgsService.getById(arenaId)
            socket.emit('chat history',[{txt: 'welcome'}] );
            io.emit('chat newMsg', {txt: `${user} is connected!`});
            // room = roomService.placeInRoom(arenaId)
            // console.log('Placed', user, 'in room:', room);
            // socket.join(room.id);
        });

        socket.on('chat msg', (msg, arenaId) => {
            console.log('message: ' + msg.txt);
            // io.to().emit('chat newMsg', msg);
            // await msgsService.update(arenaId , msg)
            io.emit('chat newMsg', msg);
        });
        socket.on('arena itemSelected', (arenaId) => {
            io.emit('arena itemSelected',arenaId);
        });
    });
}

module.exports = {
    setup ,
    io
}


