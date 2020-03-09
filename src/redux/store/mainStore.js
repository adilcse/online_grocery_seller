import {createStore,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import  thunkMiddleware  from "redux-thunk";
import { userLogin } from '../reducers/UserReducer';

 const Store=()=>{
    const logger= createLogger();
    const reducers=combineReducers({userLogin});
    const store = createStore(reducers,applyMiddleware(thunkMiddleware, logger));
    return store;

}
export default Store;