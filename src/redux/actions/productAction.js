import {GET_CATAGORIES_PENDING, GET_CATAGORIES_SUCCESS, GET_CATAGORIES_FAILED, GET_SELLER_ITEMS_PENDING, GET_SELLER_ITEMS_SUCCESS, GET_SELLER_ITEMS_FAILED} from '../../app/ActionConstant';
import { getSellerItemsAPI, getCatagoryAPI } from "../../app/helper/laravelAPI";
/**
 * fetch catagories from database
 * @param {*} dispatch USE DISPATCH HOOK
 */
export const getCatagoriesAction=(dispatch)=>{
    dispatch({type:GET_CATAGORIES_PENDING})
    getCatagoryAPI()
    .then(res=>{
        if(res)
            dispatch({type:GET_CATAGORIES_SUCCESS,payload:res.catagory});
        else
            dispatch({type:GET_CATAGORIES_FAILED});
    })
}

export const getSellerItemAction=(dispatch,user)=>{
    dispatch({type:GET_SELLER_ITEMS_PENDING});
   // getSellerItems(sellerId)
   getSellerItemsAPI(user)
    .then(res=>{
        console.log(res);
        if(!res.error)
        dispatch({type:GET_SELLER_ITEMS_SUCCESS,payload:res.items});
      else
        dispatch({type:GET_SELLER_ITEMS_FAILED});
    }).catch(err=>{
        console.log(err);
        dispatch({type:GET_SELLER_ITEMS_FAILED});
    })
}
