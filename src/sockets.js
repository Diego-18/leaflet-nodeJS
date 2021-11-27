/**
 * 
 * Listen for connection, new connection data and send the all information except for the sender
 */
module.exports = io => {
    io.on('connection', (socket) => { 
        socket.on('userCoordinates', coords => { 
            socket.broadcast.emit('newUserCoordinates', coords);
        });
    });
}