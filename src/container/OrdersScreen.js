import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {getOrders} from '../app/helper/getOrders';
import  OrdersList  from "../components/orders/OrderList";
import OrderDetails from '../components/orders/OrderDetails';
import { ORDER } from '../app/AppConstant';
import Loading from '../components/Loading';
import { orderStatusUpdate } from '../app/helper/orderStatusUpdate';
import { documentUpdate } from '../app/helper/documentUpdate';

const OrdersScreen=(props)=>{
    const sellerId=useSelector(state=>state.userLogin.userId);
    const [source,setSource]=useState([]);
    const [loading,setLoading]=useState(true);
    const [currentPage,setCurrentPage]=useState(ORDER);
    const [orderDetails,setorderDetails]=useState({});
    const updateArrayElement=(array, newItem, atIndex)=>{
      return array.map((item, index) => index === atIndex ? newItem : item);
  }
  const insertArrayElement = (arr, index,newItems) => 
        [ ...arr.slice(0, index),newItems, ...arr.slice(index)];
        const orderTotal=(item)=>{
          let total=0;
         item.forEach(el=>{
              if(el.accept){
                   total+= el.price*el.quantity;  
                  }  
          });
          const deliveryCharges=0;
          return {
            subTotal:total,
            deliveryCharges:deliveryCharges,
            itemCounts:item.length,
            total:total+deliveryCharges
                };
      }
        useEffect(() => {
          //Subscribe: firebase channel
          const getData=(snapshot)=>{
            setLoading(true);
            console.log(snapshot)
             snapshot.forEach(element => {
               const data={...element.doc.data(),id:element.doc.id,total:orderTotal(element.doc.data().items)};
                 if(element.type==='added'){
                  setSource(source=>insertArrayElement(source,element.newIndex,data));
                 }else if(element.type==='modified'){
                  setorderDetails(details=>{return {...details,status:data.status}});
                  setSource(s=>updateArrayElement(s,data,element.oldIndex));
                 }else if(element.type==='removed'){
                  setSource(s=>s.filter((_, i) => i !== element.oldIndex));
                 }
             });
             setLoading(false);
          }
          const unsubscribe=getOrders(sellerId,getData);
          return unsubscribe;
             
       },[sellerId]);
const changePage=(page,data={})=>{
  setCurrentPage(page);
  setorderDetails(data);
}
/**
 * Update the order status in database
 * @param {*} orderId 
 * @param {ACCEPT,REJECT} status 
 */
const orderAcceptReject=(orderId,status,item)=>{
  orderStatusUpdate(orderId,status,item);
}
/**
 * 
 * @param {'sellerOrders'} col collection name
 * @param {*} id order id to update
 * @param {*} data data to be updated
 */
const orderUpdate=(col,id,data)=>{
  documentUpdate(col,id,data)
}
  if(loading){
   return <Loading size={100}/>
  }else{
    console.log(source);
    return(
      <Container>
          <Row>
            {currentPage===ORDER?  
              <OrdersList orders={source} changePage={changePage} orderAcceptReject={orderAcceptReject}/>
              :<OrderDetails changePage={changePage} details={orderDetails} orderUpdate={orderUpdate}></OrderDetails>}
          </Row>
      </Container>
    )}
}
export default OrdersScreen;