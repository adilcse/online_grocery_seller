import React, { useState } from 'react';
import {Container, Row, Col, Dropdown, Button, DropdownButton} from 'react-bootstrap';
import { ORDER, ACCEPT, OUT_FOR_DELIVERY, DELIVERED } from '../../app/AppConstant';
import {FaGlobeAmericas} from 'react-icons/fa';
import{TiTick} from 'react-icons/ti';
import {IoIosArrowBack} from 'react-icons/io';
import {FiPhoneCall} from 'react-icons/fi';
import { changeStatusText } from '../../app/helper/changeStatusText';
import { useSelector } from 'react-redux';

const OrderDetails=(props)=>{
    const{details}=props;
    const [currentButton,setCurrentButton]=useState(details.status);
    const seller=useSelector(state=>state.userLogin);
    const [statusText,setStatusText]=useState(changeStatusText(details.status));
    const userLatlng={lat:details.delivery_address.lat,lng:details.delivery_address.lng};
    const sellerLatlng={lat:seller.address.lat,lng:seller.address.lng};
    const handleSelect=(e)=>{
        const st=e.target.id;
        setStatusText(changeStatusText(st));
        setCurrentButton(st);
    }
    const handleUpdate=()=>{
        const data=currentButton;
        props.orderUpdate(details.id,data);
 //       setDeliveryStatus(currentButton);
    }
   
    const DropOptions=()=>{
        if(details.status===ACCEPT){
            return <>
             <Dropdown.Item as="button" id={OUT_FOR_DELIVERY}  onClick={handleSelect}>Out for Delivery</Dropdown.Item>
             <Dropdown.Item as="button" id={DELIVERED}  onClick={handleSelect}>Delivered</Dropdown.Item>
            </>
        }else if(details.status===OUT_FOR_DELIVERY){
            return   <Dropdown.Item as="button" id={DELIVERED}  onClick={handleSelect}>Delivered</Dropdown.Item>
        }else
            return <></>
    }
return(
        <Container className="border">
            <Row className="border-bottom bg-light" >
            <Col>Order id:{details.id}</Col>
            <Col>Payment Mode:{details.payment_mode}</Col>
                <Col>Order status:{details.status}</Col>
            </Row>
            <Row>
                <Col>
            {details.items.map(item=>{
                if(item.accept)
                return<Row key={item.id} className='text-center'>
                    <h6 className="text-secondary">{item.name} ₹{item.price} * {item.quantity}=₹{item.price*item.quantity}/- Only</h6>
                </Row>
                return null;
              
            })}       
            </Col>
            <Col>
            <Row> Order by : {details.delivery_address.name}</Row>
            <Row className='text-truncate'>Address: {details.delivery_address.address},{details.delivery_address.city},{details.delivery_address.locality},{details.delivery_address.landmark}</Row>
            <Row> Pin:{details.delivery_address.pin}</Row>
            <Row> 
            Contact:  <FiPhoneCall/>  {details.delivery_address.mobile},{details.delivery_address.alternate}
            </Row>
            <Row>Payment to be recieved:<b>₹{details.total_amount-details.refund_amount+details.delivery_amount}/- Only </b> </Row>
            <Row>Change Status: 
                <DropdownButton id="dropdown-update-button" variant={details.status===currentButton?'success':'secondary'} title={statusText}>
                   <DropOptions/>
                </DropdownButton>
            </Row>
            </Col>
            </Row>
            <Row className="bg-light">
                <Col><Button variant="outline-secondary" href={`https://maps.google.com/maps?saddr=${sellerLatlng.lat},${sellerLatlng.lng}&daddr=${userLatlng.lat},${userLatlng.lng}`}  target="_blank"> View   in Map <FaGlobeAmericas/></Button></Col>
                <Col>{details.status!==DELIVERED?<Button variant="outline-warning" onClick={handleUpdate} > Update <TiTick/></Button>:<></>}</Col>
                <Col><Button variant="outline-primary" onClick={()=>props.changePage(ORDER)}><IoIosArrowBack/>Back</Button></Col>
            </Row>
        </Container>
)
}
export default OrderDetails;