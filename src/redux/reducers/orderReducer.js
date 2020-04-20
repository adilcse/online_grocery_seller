import { GET_ORDER_SUCCESS, GET_ORDER_PENDING, GET_ORDER_FAILED, CHANGE_DETAILS } from "../../app/ActionConstant";

const initialState={
    loading:false,
    loaded:false,
    orders:[],
    error:false,
    details:{}
}
export const getOrders=(state=initialState,action={})=>{
switch(action.type){
    case GET_ORDER_PENDING:
        return{...state,loading:true,loaded:false}
    case GET_ORDER_SUCCESS:
        {

          
              return{...state,orders:action.payload,loaded:true,loading:false}
        }
        case GET_ORDER_FAILED:
            return{...state,loading:false,loaded:true,error:action.payload}
        case CHANGE_DETAILS:
            return{...state,details:action.payload}
    default:
        return state;
}
}