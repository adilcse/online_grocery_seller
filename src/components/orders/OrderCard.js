import React, { useState } from 'react';
import { CardDeck, Card, Alert} from 'react-bootstrap';
import ItemCard from './ItemCard';
import StatusCard from './StatusCard';
import Loading from '../Loading';
import HeaderCard from './HeaderCard';
import { getItemsByIds } from '../../app/helper/getItemsByIds';
import { arrayMergeByObject } from '../../app/helper/arrayMergeByObject';
import { DETAILS } from '../../app/AppConstant';
const OrderCard=(props)=>{
    const{order}=props;
    const [loaded,setLoaded]=useState(false);
    const [item,setItem]=useState(order.items);
    const orderStatus=order.status;
    const [selectedItems,setSelectedItems]=useState(order.items.filter(el=>el.accept).length);
    const [showError,setShowError]=useState(false);
    const itemStatus=(e)=>{
        let Nitem=[...item];
       const i= Nitem.findIndex(el=>el.id===e.target.value);
       Nitem[i].accept=e.target.checked;
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
        props.orderAcceptReject(order.id,status,item);
    }
  if(order && !loaded){
      
      const ids=order.items.map(el=>el.id);
      getItemsByIds(ids).then(res=>{
         setItem(arrayMergeByObject(res,item,'id'))
      })
        setLoaded(true);}
    const viewDetails=()=>{
        props.changePage(DETAILS,{...order,items:arrayMergeByObject(order.items,item,'id')});
    }
    if(order && loaded){
        return (
            <>
            {showError?<Alert variant='danger'>Please select Atleast one item</Alert>:<></>}
            <CardDeck className='rounded mb-3'>
               
            <Card>
                <Card.Header>
                    <HeaderCard orderedOn={order.orderedOn} deliveredOn={order.deliveredOn}/>
                </Card.Header>
            <Card.Body>
            <ItemCard items={item} itemStatus={itemStatus} state={orderStatus}/>
            <StatusCard address={order.DeliveryAddress} 
                        paymentMode={order.paymentMode} 
                        total={order.total} 
                        viewDetails={viewDetails}
                        onAccept={handleAccept}
                        state={orderStatus}
                        />
            </Card.Body>
            </Card>
        </CardDeck>
        </>
        )
       
       }else if(!loaded){
           
           return(<Loading size={100}/>)
       }
    else{
        return(
            <></>
        )
    }
}
export default OrderCard;