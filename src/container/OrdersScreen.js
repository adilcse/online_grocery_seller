import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {getOrders} from '../app/helper/getOrders';
import  OrdersList  from "../components/orders/OrderList";
let arr=[];
const OrdersScreen=(props)=>{
    const sellerId=useSelector(state=>state.userLogin.userId);
    const [loaded,setLoaded]=useState(false);
    const [changed,setChanged]=useState(false);
    const [source,setSource]=useState([])
    const getData=(snapshot)=>{
        
       snapshot.forEach(element => {
           if(element.type==='added'){
            arr.unshift(element.doc.data())
           }else if(element.type==='modified')
         arr[arr.length-element.newIndex-1]=element.doc.data();
       });
        setSource([...arr])
       setChanged(!changed)
    }
    if(!loaded && sellerId){
        getOrders(sellerId,getData);
        setLoaded(true)
    }

  
return(
  <Container>
      <Row >
       <OrdersList orders={source}/>
      </Row>
  </Container>
)
}
export default OrdersScreen;