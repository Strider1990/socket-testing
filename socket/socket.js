let loaded = require('dotenv').config();

if (loaded.error) {
    throw loaded.error;
}

const jwt = require('jsonwebtoken');
const cookie = require('cookie');

module.exports = function (io) {
    var users = new Set();

    io.set('authorization', (handshake, callback) => {
        if (handshake.headers.cookie) {
            const parsed = cookie.parse(handshake.headers.cookie);
            jwt.verify(parsed['x-token'], process.env.JWT_SECRET, (err, decoded) => {
                if (err) return callback(null, false);
                callback(null, true);
            });
        } else {
            callback(null, false);
        }
    })

    io.use((socket, next) => {
        console.log("Middleware: ", socket.handshake.headers.cookie);
        next();
    });

    io.on('connection', (socket) => {
        console.log("User connected");
        users.add(socket.id);

        socket.broadcast.emit('connection', socket.id);

        socket.on('disconnect', () => {
            io.emit('disconnect', socket.id);
            users.delete(socket.id);
        });

        socket.on('message', (data) => {
            console.log(data);
        });

        socket.on('sendPing', (id) => {
            socket.to(id).emit('receivedPing', socket.id + " sent a PING!");
        });
    });
}