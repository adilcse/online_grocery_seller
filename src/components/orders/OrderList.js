import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
const OrderList=(props)=>{
  const products=useSelector(state=>state.productReducer);
    if(props.orders.length>0){
        return(
            <Container>
            {/* Stack the columns on mobile by making one full-width and the other half-width */}
            <Row className="justify-content-md-center">
              <Col xs={12} md={10}>
                {props.orders.map((order,index)=>{  
                  return <OrderCard order={order} 
                                    key={index} 
                                    changePage={props.changePage} 
                                    orderAcceptReject={props.orderAcceptReject} 
                                    sellerId={props.sellerId}
                                    products={products}/>
                })}
              </Col>
            </Row>
            </Container>
          
        )}else{
            return(<h3>Nothing ordered yet.</h3>)
        }
}
export default OrderList;