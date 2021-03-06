import React, { useState } from 'react';
import {Container, Row, Col, Dropdown, Button, DropdownButton} from 'react-bootstrap';
import { ORDER, ACCEPT, OUT_FOR_DELIVERY, DELIVERED } from '../../app/AppConstant';
import {FaGlobeAmericas} from 'react-icons/fa';
import{TiTick} from 'react-icons/ti';
import {IoIosArrowBack} from 'react-icons/io';
import {FiPhoneCall} from 'react-icons/fi';
import { changeStatusText } from '../../app/helper/changeStatusText';
import { useSelector } from 'react-redux';
import {firebase} from '../../firebaseConnect';
const OrderDetails=(props)=>{
    const{details}=props;
    const [deliveryStatus,setDeliveryStatus]=useState(details.status);
    const [currentButton,setCurrentButton]=useState(details.status);
    const seller=useSelector(state=>state.userLogin);
    const [statusText,setStatusText]=useState(changeStatusText(details.status));
    const userLatlng=details.address.latLng;
    const sellerLatlng=seller.coordinates;
    const handleSelect=(e)=>{
        const st=e.target.id;
        setStatusText(changeStatusText(st));
        setCurrentButton(st);
    }
    const handleUpdate=()=>{
        const data=currentButton===DELIVERED?
                    {status:currentButton,deliveredOn:firebase.firestore.FieldValue.serverTimestamp()}
                    :{status:currentButton};
        props.orderUpdate('sellerOrders',details.id,data);
        setDeliveryStatus(currentButton);
    }
   
    const DropOptions=()=>{
        if(deliveryStatus===ACCEPT){
            return <>
             <Dropdown.Item as="button" id={OUT_FOR_DELIVERY}  onClick={handleSelect}>Out for Delivery</Dropdown.Item>
             <Dropdown.Item as="button" id={DELIVERED}  onClick={handleSelect}>Delivered</Dropdown.Item>
            </>
        }else if(deliveryStatus===OUT_FOR_DELIVERY){
            return   <Dropdown.Item as="button" id={DELIVERED}  onClick={handleSelect}>Delivered</Dropdown.Item>
        }else
            return <></>
    }
return(
        <Container className="border">
            <Row className="border-bottom bg-light" >
            <Col>Order id:{details.orderId}</Col>
            <Col>Payment Mode:{details.paymentMode}</Col>
                <Col>Order status:{details.status}</Col>
            </Row>
            <Row>
                <Col>
            {details.items.map(item=>{
                if(item.accept)
                return<Row key={item.id} className='text-center'>
                    <h6 className="text-secondary">{item.name} ({item.catagory.join()}) ₹{item.price} * {item.quantity}=₹{item.price*item.quantity}/- Only</h6>
                </Row>
                return null;
              
            })}       
            </Col>
            <Col>
            <Row> Order by : {details.address.name}</Row>
            <Row className='text-truncate'>Address: {details.address.address},{details.address.city},{details.address.locality},{details.address.landmark}</Row>
            <Row> Pin:{details.address.pin}</Row>
            <Row> 
            Contact:  <FiPhoneCall/>  {details.address.mobile},{details.address.alternate}
            </Row>
            <Row>Payment to be recieved:<b>₹{details.total.total}/- Only </b> </Row>
            <Row>Change Status: 
                <DropdownButton id="dropdown-update-button" variant={deliveryStatus===currentButton?'success':'secondary'} title={statusText}>
                   <DropOptions/>
                </DropdownButton>
            </Row>
            </Col>
            </Row>
            <Row className="bg-light">
                <Col><Button variant="outline-secondary" href={`https://maps.google.com/maps?saddr=${sellerLatlng.latitude},${sellerLatlng.longitude}&daddr=${userLatlng.latitude},${userLatlng.longitude}`}  target="_blank"> View   in Map <FaGlobeAmericas/></Button></Col>
                <Col>{deliveryStatus!==DELIVERED?<Button variant="outline-warning" onClick={handleUpdate} > Update <TiTick/></Button>:<></>}</Col>
                <Col><Button variant="outline-primary" onClick={()=>props.changePage(ORDER)}><IoIosArrowBack/>Back</Button></Col>
            </Row>
        </Container>
)
}
export default OrderDetails;