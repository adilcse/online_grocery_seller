import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {getOrders} from '../app/helper/getOrders';
import  OrdersList  from "../components/orders/OrderList";
import OrderDetails from '../components/orders/OrderDetails';
import { ORDER } from '../app/AppConstant';
let arr=[];

const OrdersScreen=(props)=>{
    const sellerId=useSelector(state=>state.userLogin.userId);
    const [loaded,setLoaded]=useState(false);
    const [changed,setChanged]=useState(false);
    const [source,setSource]=useState([])
    const [currentPage,setCurrentPage]=useState(ORDER);
    const [orderDetails,setorderDetails]=useState({});
    const getData=(snapshot)=>{
        
       snapshot.forEach(element => {
           if(element.type==='added'){
            arr.unshift({...element.doc.data(),id:element.doc.id})
           }else if(element.type==='modified')
         arr[arr.length-element.newIndex-1]={...element.doc.data(),id:element.doc.id};
       });
        setSource([...arr])
       setChanged(!changed)
    }
    if(!loaded && sellerId){
        getOrders(sellerId,getData);
        setLoaded(true)
    }
const changePage=(page,data={})=>{
  setCurrentPage(page);
  setorderDetails(data);
}
  
return(
  <Container>
      <Row>
        {currentPage===ORDER?  <OrdersList orders={source} changePage={changePage}/>:<OrderDetails changePage={changePage} details={orderDetails}></OrderDetails>}
      </Row>
  </Container>
)
}
export default OrdersScreen;