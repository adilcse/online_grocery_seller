import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {getOrders} from '../app/helper/getOrders';
import  OrdersList  from "../components/orders/OrderList";
import OrderDetails from '../components/orders/OrderDetails';
import { ORDER } from '../app/AppConstant';
import Loading from '../components/Loading';

const OrdersScreen=(props)=>{
    const sellerId=useSelector(state=>state.userLogin.userId);
    const [loaded,setLoaded]=useState(false);
    const [source,setSource]=useState([]);
    const [loading,setLoading]=useState(true);
    const [currentPage,setCurrentPage]=useState(ORDER);
    const [orderDetails,setorderDetails]=useState({});
    const updateArrayElement=(array, newItem, atIndex)=>{
      return array.map((item, index) => index === atIndex ? newItem : item);
  }
  const insertArrayElement = (arr, index,newItems) => 
        [ ...arr.slice(0, index),newItems, ...arr.slice(index)];
        useEffect(() => {
          //Subscribe: firebase channel
          const getData=(snapshot)=>{
            setLoading(true);
            console.log(snapshot)
             snapshot.forEach(element => {
               const data={...element.doc.data(),id:element.doc.id};
                 if(element.type==='added'){
                  setSource(source=>insertArrayElement(source,element.newIndex,data));
                 }else if(element.type==='modified'){
                  setSource(s=>updateArrayElement(s,data,element.oldIndex));
                 }else if(element.type==='removed'){
                  setSource(s=>s.filter((_, i) => i !== element.oldIndex));
                 }
             });
             setLoading(false);
          }
          const unsubscribe=getOrders(sellerId,getData);
          return unsubscribe;
             
       },[setLoading,setSource]);
const changePage=(page,data={})=>{
  setCurrentPage(page);
  setorderDetails(data);
}
  if(loading){
   return <Loading size={100}/>
  }else{
    console.log(source);
    return(
      <Container>
          <Row>
            {currentPage===ORDER?  <OrdersList orders={source} changePage={changePage}/>:<OrderDetails changePage={changePage} details={orderDetails}></OrderDetails>}
          </Row>
      </Container>
    )}
}
export default OrdersScreen;