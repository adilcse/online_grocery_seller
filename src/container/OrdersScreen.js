import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {getOrders} from '../app/helper/getOrders';
import  OrdersList  from "../components/orders/OrderList";
import OrderDetails from '../components/orders/OrderDetails';
import { ORDER } from '../app/AppConstant';

const OrdersScreen=(props)=>{
    const sellerId=useSelector(state=>state.userLogin.userId);
    const [loaded,setLoaded]=useState(false);
    const [source,setSource]=useState([])
    const [currentPage,setCurrentPage]=useState(ORDER);
    const [orderDetails,setorderDetails]=useState({});
    function updateArrayElement(array, newItem, atIndex) {
      return array.map((item, index) => index === atIndex ? newItem : item);
  }
    const getData=(snapshot)=>{
      console.log(snapshot);
       snapshot.forEach(element => {
         const data={...element.doc.data(),id:element.doc.id};
           if(element.type==='added'){
            setSource(source=>[...source,data]);
           }else if(element.type==='modified'){
            setSource(s=>updateArrayElement(s,data,element.oldIndex));
           }
       });
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