import { LAST_SELLER_ITEM_FETCHED } from "../../app/ActionConstant";

export const PaggingReducer=(state={},action={})=>{
    switch(action.payload){
        case LAST_SELLER_ITEM_FETCHED:
            return{...state,lastItem:action.payload}
        default:
        return state;
    }
}