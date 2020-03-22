import { ACCEPT, REJECT } from "../AppConstant";
import {documentUpdate} from './documentUpdate';
 export const orderStatusUpdate=(sellerOrderId,status,item={})=>{
    const Nitem=item.map(el=>{
        return {
            id:el.id,
            price:el.price,
            quantity:el.quantity,
            accept:status?el.accept:false}
    });
    const Norder={
        items:Nitem,
        status:ACCEPT
    }
    Norder.status=status?ACCEPT:REJECT;
    return documentUpdate('sellerOrders',sellerOrderId,Norder);
}