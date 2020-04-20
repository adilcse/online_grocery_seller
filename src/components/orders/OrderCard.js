import React, { useState } from 'react';
import { CardDeck, Card, Alert} from 'react-bootstrap';
import ItemCard from './ItemCard';
import StatusCard from './StatusCard';
import Loading from '../Loading';
import HeaderCard from './HeaderCard';
import { arrayMergeByObject } from '../../app/helper/arrayMergeByObject';
import { DETAILS } from '../../app/AppConstant';


const OrderCard=(props)=>{
    const{order}=props;
    const [item,setItem]=useState(order.items);
    const orderStatus=order.status;
    const [selectedItems,setSelectedItems]=useState(order.items.filter(el=>el.accept).length);
    const [showError,setShowError]=useState(false);

    const itemStatus=(e)=>{
        let Nitem=[...item];
       // eslint-disable-next-line eqeqeq
       const i= Nitem.findIndex(el=>el.id==e.target.value);
       Nitem[i].accept=e.target.checked?1:0;
       setItem(Nitem);
        const count=e.target.checked?selectedItems+1:selectedItems-1;
       setSelectedItems(count);
    }
    const handleAccept=(status)=>{
        if(status && selectedItems<=0){
                setShowError(true);
                return;   
        }
        setShowError(false);
        const items=item.map(el=>{return {id:el.id,accept:el.accept}});
        props.orderAcceptReject(order.id,status,items);
    }

    const viewDetails=()=>{
        props.changePage(DETAILS,{...order,items:arrayMergeByObject(order.items,item,'id')});
    }
    if(order){
        console.log(order)
        return (
            <>
            {showError?<Alert variant='danger'>Please select Atleast one item</Alert>:<></>}
            <CardDeck className='rounded mb-3'>
               
            <Card>
                <Card.Header>
                    <HeaderCard orderedOn={order.created_at} id={order.id} deliveredOn={order.delivered_at}/>
                </Card.Header>
            <Card.Body>
            <ItemCard items={item} itemStatus={itemStatus} state={orderStatus}/>
            <StatusCard address={order.delivery_address} 
                        paymentMode={order.payment_mode} 
                        total={{"total": order.total_amount,
                            "refund_amount": order.refund_amount,
                            "delivery_charges": order.delivery_amount,
                            "total_items": order.total_items,
                            "rejected_items": order.rejected_items}} 
                        viewDetails={viewDetails}
                        onAccept={handleAccept}
                        state={orderStatus}
                        />
            </Card.Body>
            </Card>
        </CardDeck>
        </>
        )
       
       }else{
           
           return(<Loading size={100}/>)
       }
}
export default OrderCard;