import {LAST_SELLER_ITEM_FETCHED} from '../../app/ActionConstant';
export const setLastItem=(dispatch,item)=>{
    dispatch({type:LAST_SELLER_ITEM_FETCHED,payload:item})
}