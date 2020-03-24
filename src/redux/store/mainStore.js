import {createStore,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import  thunkMiddleware  from "redux-thunk";
import { userLogin } from '../reducers/UserReducer';
import {PaggingReducer} from '../reducers/PaggingReducer';
 const Store=()=>{
    const logger= createLogger();
    const reducers=combineReducers({userLogin,PaggingReducer});
    const store = createStore(reducers,applyMiddleware(thunkMiddleware, logger));
    return store;

}
export default Store;