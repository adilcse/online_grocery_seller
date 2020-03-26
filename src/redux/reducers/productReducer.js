import { GET_CATAGORIES_PENDING, GET_CATAGORIES_SUCCESS, GET_CATAGORIES_FAILED, GET_SELLER_ITEMS_PENDING, GET_SELLER_ITEMS_SUCCESS, GET_SELLER_ITEMS_FAILED } from "../../app/ActionConstant"

const initialState={
loaded:false,
loading:false,
catagories:[],
error:false,
}
export const catagoryReducer=(state=initialState,action={})=>{
    switch(action.type){
        case GET_CATAGORIES_PENDING:
            return{...state,loading:true,loaded:false,error:false}
        case GET_CATAGORIES_SUCCESS:
            return{...state,loading:false,loaded:true,catagories:action.payload,error:false}
        case GET_CATAGORIES_FAILED:
            return{...state,loading:false,loaded:true,error:action.payload}
        default:
            return state;
    }
}

const initialProducts={
    loaded:false,
    loading:false,
    products:[],
    error:false,
}

export const productReducer=(state=initialProducts,action={})=>{
    switch(action.type){
        case GET_SELLER_ITEMS_PENDING:
            return{...state,loaded:false,loading:true,error:false}
        case GET_SELLER_ITEMS_SUCCESS:
            return{...state,loaded:true,loading:false,products:action.payload,error:false}
        case GET_SELLER_ITEMS_FAILED:
            return{...state,loaded:true,loading:false,error:true}
        default:
            return state
    }
}