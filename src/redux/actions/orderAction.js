import {GET_ORDER_PENDING, GET_ORDER_SUCCESS, CHANGE_DETAILS } from "../../app/ActionConstant";
import { getOrders } from "../../app/helper/getOrders";
export const getOrdersAction=(dispatch,sellerId)=>{
    dispatch({type:GET_ORDER_PENDING})
    const getData=(snapshot)=>{
        dispatch({type:GET_ORDER_SUCCESS,payload:snapshot})
      }
    getOrders(sellerId,getData);
}

export const changeOrderDetails=(dispatch,data)=>{
    dispatch({type:CHANGE_DETAILS,payload:data})
}