
import { getOrderAPI } from "./laravelAPI"

export const getOrders=(user,fun,lmt=10)=>{
    getOrderAPI(user,1,lmt).then(res=>{
        fun(res);
    }).catch(err=>{
        console.log(err);
    })
}