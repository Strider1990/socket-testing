import React from 'react';
import openSocket from 'socket.io-client';

const Socket = (props) => {
    const socket = openSocket('http://localhost:8080');

    return null;
}

export default Socket;