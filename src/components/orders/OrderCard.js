import React, { useState } from 'react';
import { CardDeck, Card} from 'react-bootstrap';
import ItemCard from './ItemCard';
import StatusCard from './StatusCard';
import Loading from '../Loading';
import HeaderCard from './HeaderCard';
import { getItemsByIds } from '../../app/helper/getItemsByIds';
import { arrayMergeByObject } from '../../app/helper/arrayMergeByObject';
const OrderCard=(props)=>{
    const{order}=props;
    const [loaded,setLoaded]=useState(false);
    const [item,setItem]=useState(order.items);

  if(order && !loaded){
      const ids=order.items.map(el=>el.id);
      getItemsByIds(ids).then(res=>{
         setItem(arrayMergeByObject(res,item,'id'))
      })
        setLoaded(true);}
    const viewDetails=()=>{
     
    }
    if(order && loaded){
       
        return (
            <CardDeck className='rounded mb-3'>
            <Card>
                <Card.Header>
                    <HeaderCard orderedOn={order.orderedOn} deleveredOn={order.deleveredOn}/>
                </Card.Header>
            <Card.Body>
            <ItemCard items={item} />
            <StatusCard address={order.DeliveryAddress} 
                        paymentMode={order.paymentMode} 
                        total={item}
                        status={order.status}   
                        viewDetails={viewDetails}
                        />
            </Card.Body>
            </Card>
        </CardDeck>
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