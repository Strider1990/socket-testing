import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from '../reducers/RootReducer';
import { createStore, applyMiddleware } from 'redux';

export default function configureStore() {
    const epicMiddleware = createEpicMiddleware();    

    const store = createStore(
        rootReducer,
        applyMiddleware(epicMiddleware)
    );
    
    epicMiddleware.run(rootEpic);
    
    return store;
}