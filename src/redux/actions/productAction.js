import { getCatagories } from "../../app/helper/getCatagories";
import {GET_CATAGORIES_PENDING, GET_CATAGORIES_SUCCESS, GET_CATAGORIES_FAILED, GET_SELLER_ITEMS_PENDING, GET_SELLER_ITEMS_SUCCESS, GET_SELLER_ITEMS_FAILED} from '../../app/ActionConstant';
import getSellerItems from "../../app/helper/getSellerItems";
/**
 * fetch catagories from database
 * @param {*} dispatch USE DISPATCH HOOK
 */
export const getCatagoriesAction=(dispatch)=>{
    dispatch({type:GET_CATAGORIES_PENDING})
    getCatagories().then(res=>{
        if(res)
            dispatch({type:GET_CATAGORIES_SUCCESS,payload:res});
        else
            dispatch({type:GET_CATAGORIES_FAILED});
    })
}

export const getSellerItemAction=(dispatch,sellerId)=>{
    dispatch({type:GET_SELLER_ITEMS_PENDING});
    getSellerItems(sellerId).then(res=>{
        if(res)
        dispatch({type:GET_SELLER_ITEMS_SUCCESS,payload:res});
      else
        dispatch({type:GET_SELLER_ITEMS_FAILED});
    })
}
