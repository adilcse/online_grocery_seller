import { ACCEPT, REJECT } from "../AppConstant";
import {documentUpdate} from './documentUpdate';
 export const orderStatusUpdate=(sellerOrderId,status,item={})=>{

    let count=0,tot=0;
    const products=[];
    const Nitem=item.map(el=>{
        if(!el.accept ||!status || (el.stock - el.quantity) <=0){
            count++;
            tot=tot+(el.price*el.quantity);
        } else {
            products.push({id:el.id,update:{stock:el.stock - el.quantity}});
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
        "total.refundAmount":tot,
        "total.rejectItems":count
    }
    console.log(products);
    products.forEach(element=>{
        documentUpdate('sellerItems',element.id,element.update)
        }
    )
    return documentUpdate('sellerOrders',sellerOrderId,Norder);
}
