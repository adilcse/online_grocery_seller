import {createStore,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import  thunkMiddleware  from "redux-thunk";
import { userLogin } from '../reducers/UserReducer';
import {PaggingReducer} from '../reducers/PaggingReducer';
import { catagoryReducer,productReducer } from '../reducers/productReducer';
import {getOrders} from '../reducers/orderReducer';
 const Store=()=>{
    const logger= createLogger();
    const reducers=combineReducers({userLogin,PaggingReducer,catagoryReducer,productReducer,getOrders});
    const store = createStore(reducers,applyMiddleware(thunkMiddleware, logger));
    return store;

}
export default Store;