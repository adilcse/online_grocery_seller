import {GET_ORDER_PENDING, GET_ORDER_SUCCESS, CHANGE_DETAILS, GET_ORDER_FAILED } from "../../app/ActionConstant";
import { getOrders } from "../../app/helper/getOrders";
export const getOrdersAction=(dispatch,user)=>{
    dispatch({type:GET_ORDER_PENDING})
    const getData=(snapshot)=>{
        if(snapshot.error){
            dispatch({type:GET_ORDER_FAILED,payload:snapshot.error})
        }
        if(snapshot.order)
        dispatch({type:GET_ORDER_SUCCESS,payload:snapshot.order})
      }
    getOrders(user,getData);
}

export const changeOrderDetails=(dispatch,data)=>{
    dispatch({type:CHANGE_DETAILS,payload:data})
}