import React from 'react';
import openSocket from 'socket.io-client';

const Socket = (props) => {
    const socket = openSocket('http://localhost:8080', {
        transports: ['websocket']
    });

    socket.on('connection', (socket) => {
        console.log("Connected: ", socket);
    });

    return null;
}

export default Socket;