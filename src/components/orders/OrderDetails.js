import React from 'react';
import {Container, Row, Col, Dropdown, Button} from 'react-bootstrap';
import { ORDER } from '../../app/AppConstant';
import {FaGlobeAmericas} from 'react-icons/fa';
import{TiTick} from 'react-icons/ti';
import {IoIosArrowBack} from 'react-icons/io';
import {FiPhoneCall} from 'react-icons/fi';
const OrderDetails=(props)=>{
    const{details}=props;
    console.log(details)
return(
        <Container className="border">
            <Row className="border-bottom bg-light" >
            <Col>Order id:{details.orderId}</Col>
            <Col>Payment Mode:{details.paymentMode}</Col>
                <Col>Order status:{details.status}</Col>
            </Row>
            <Row>
                <Col>
            <h1>{details.items.name}</h1>
            <h5 className="text-secondary">Catogory:{details.items.catagory}</h5>
            </Col>
            <Col>
            <Row> Order by : {details.DeliveryAddress.name}</Row>
            <Row>Address: {details.DeliveryAddress.address},{details.DeliveryAddress.city},{details.DeliveryAddress.locality},{details.DeliveryAddress.landmark}</Row>
            <Row> Pin:{details.DeliveryAddress.pin}</Row>
            <Row> 
            Contact:  <FiPhoneCall/>  {details.DeliveryAddress.mobile},{details.DeliveryAddress.alternate}
            </Row>
            <Row>Payment to be recieved:{details.items.price}</Row>
            <Row>Status Update: <Dropdown >
  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
  {details.status}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item className="text-warning" href="">Out For Deliver</Dropdown.Item>
    <Dropdown.Item className="text-success" href="">Delevered</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
</Row>
            </Col>
            </Row>
            <Row className="bg-light">
                <Col><Button variant="outline-secondary"> View   in Map <FaGlobeAmericas/></Button></Col>
                <Col><Button variant="outline-warning" disabled> Done <TiTick/></Button></Col>
                <Col><Button variant="outline-primary" onClick={()=>props.changePage(ORDER)}><IoIosArrowBack/>Back</Button></Col>
            </Row>
        </Container>
)
}
export default OrderDetails;