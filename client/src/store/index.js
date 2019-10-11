import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from '../reducers/RootReducer';
import { createStore, applyMiddleware } from 'redux';
import createSocketMiddleware from '../middleware/SocketMiddleware';

export default function configureStore() {
    const epicMiddleware = createEpicMiddleware();
    const socketMiddleware = createSocketMiddleware('http://localhost:10718/');
    const middleware = [epicMiddleware, socketMiddleware];

    const store = createStore(
        rootReducer,
        applyMiddleware(...middleware)
    );
    
    epicMiddleware.run(rootEpic);
    
    return store;
}