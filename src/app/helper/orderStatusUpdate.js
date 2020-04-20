
import { orderAcceptRejectAPI } from "./laravelAPI";
 export const orderStatusUpdate=(user,orderId,status,items={})=>{
    return orderAcceptRejectAPI(user,orderId,status,items)
}
