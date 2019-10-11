import openSocket from 'socket.io-client';
import { CONNECT_SOCKET, DISCONNECT_SOCKET, connectedSocket } from '../actions/SocketActions';

const createSocketMiddleware = (url) => {
    let socket;

    return storeAPI => next => action => {
        switch (action.type) {
            case CONNECT_SOCKET:
                socket = openSocket(url, {
                    transports: ['websocket']
                });

                socket.on('connect', () => {
                    socket.emit('message', { message: "Hello World" });
                    storeAPI.dispatch(connectedSocket(socket))
                });
                
                break;
            case DISCONNECT_SOCKET: 
                socket.close();
                break;
        }

        return next(action);
    }
}

export default createSocketMiddleware;