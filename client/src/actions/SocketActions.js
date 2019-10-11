import { ofType } from "redux-observable";
import { mapTo } from "rxjs/operators";

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const CONNECTING_SOCKET = 'CONNECTING_SOCKET';
export const CONNECTED_SOCKET = 'CONNECTED_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
export const DISCONNECTED_SOCKET = 'DISCONNECTED_SOCKET';

export const connectSocket = () => {
    return {
        type: CONNECT_SOCKET
    }
}

export const connectingSocket = () => {
    return {
        type: CONNECTING_SOCKET
    }
}

export const connectedSocket = (socket) => {
    return {
        type: CONNECTED_SOCKET,
        socket
    }
}

export const disconnectSocket = () => {
    return {
        type: DISCONNECT_SOCKET
    }
}

export const disconnectedSocket = (host) => {
    return {
        type: DISCONNECTED_SOCKET,
        host
    }
}

export const socketConnectEpic = action$ =>
    action$.pipe(
        ofType(CONNECTED_SOCKET)
    )