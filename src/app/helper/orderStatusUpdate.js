import { ACCEPT, REJECT } from "../AppConstant";
import {documentUpdate} from './documentUpdate';
 export const orderStatusUpdate=(sellerOrderId,status,item={})=>{

    let count=0,tot=0;
    const Nitem=item.map(el=>{
        if(!el.accept ||!status){
            count++;
            tot=tot+(el.price*el.quantity);
           }
        return {
            id:el.id,
            price:el.price,
            quantity:el.quantity,
            accept:status?el.accept:false,
        }
    });
    const Norder={
        "items":Nitem,
        "status":status?ACCEPT:REJECT,
        "total.refundAmmount":tot,
        "total.rejectItems":count
    }
   
    return documentUpdate('sellerOrders',sellerOrderId,Norder);
}