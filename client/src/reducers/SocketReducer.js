import { CONNECT_SOCKET, CONNECTING_SOCKET, CONNECTED_SOCKET, DISCONNECT_SOCKET, DISCONNECTED_SOCKET } from '../actions/SocketActions';

const socketReducer = (state = {}, action) => {
    switch (action.type) {
        case CONNECT_SOCKET:
            return state;
        default:
            return state;
    }
}

export default socketReducer;