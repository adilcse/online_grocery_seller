import React,{ useState} from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import  OrdersList  from "../components/orders/OrderList";
import OrderDetails from '../components/orders/OrderDetails';
import { ORDER } from '../app/AppConstant';
import Loading from '../components/Loading';
import { orderStatusUpdate } from '../app/helper/orderStatusUpdate';
import { documentUpdate } from '../app/helper/documentUpdate';
import { getOrdersAction, changeOrderDetails } from '../redux/actions/orderAction';

const OrdersScreen=(props)=>{
    const sellerId=useSelector(state=>state.userLogin.userId);
    const [currentPage,setCurrentPage]=useState(ORDER);
    const orders=useSelector(state=>state.getOrders);
    const dispatch=useDispatch();

      if(!orders.loaded && !orders.loading){
        getOrdersAction(dispatch,sellerId);
      }
     
const changePage=(page,data={})=>{
  changeOrderDetails(dispatch,data);
  setCurrentPage(page);
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
  if(orders.loading){
   return <Loading size={100}/>
  }else{
    return(
      <Container>
          <Row>
            {currentPage===ORDER?  
              <OrdersList orders={orders.orders} changePage={changePage} orderAcceptReject={orderAcceptReject} sellerId={sellerId}/>
              :<OrderDetails changePage={changePage} details={orders.details} orderUpdate={orderUpdate}></OrderDetails>}
          </Row>
      </Container>
    )}
}
export default OrdersScreen;