import React, { useState } from 'react';
import {Container, Row, Col, Dropdown, Button, DropdownButton} from 'react-bootstrap';
import { ORDER, ACCEPT, OUT_FOR_DELIVERY, DELIVERED } from '../../app/AppConstant';
import {FaGlobeAmericas} from 'react-icons/fa';
import{TiTick} from 'react-icons/ti';
import {IoIosArrowBack} from 'react-icons/io';
import {FiPhoneCall} from 'react-icons/fi';
import { documentUpdate } from '../../app/helper/documentUpdate';
const OrderDetails=(props)=>{
    const{details}=props;
    const [deliveryStatus,setDeliveryStatus]=useState(details.status);
    const [currentButton,setCurrentButton]=useState(details.status);
    const changeText=(st)=>{
        switch(st){
            case ACCEPT:
                return ACCEPT;
            case OUT_FOR_DELIVERY:
                return 'OUT FOR DELIVERY';
                
            case DELIVERED:
                return DELIVERED;
            default:
                return st;
        }
    }
    const [statusText,setStatusText]=useState(changeText(details.status));
    const handleSelect=(e)=>{
        const st=e.target.id;
        setStatusText(changeText(st));
        setCurrentButton(st);
    }
    const handleUpdate=()=>{
        documentUpdate('sellerOrders',details.id,{status:currentButton}).then(res=>{
            if(res){
                setDeliveryStatus(currentButton)
            }
        })
    }
    console.log(details)
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
                    <h5 className="text-secondary">{item.name} ({item.catagory.join()}) ₹{item.price} * {item.quantity}=₹{item.price*item.quantity}/- Only</h5>
                </Row>
              
            })}       
            </Col>
            <Col>
            <Row> Order by : {details.DeliveryAddress.name}</Row>
            <Row>Address: {details.DeliveryAddress.address},{details.DeliveryAddress.city},{details.DeliveryAddress.locality},{details.DeliveryAddress.landmark}</Row>
            <Row> Pin:{details.DeliveryAddress.pin}</Row>
            <Row> 
            Contact:  <FiPhoneCall/>  {details.DeliveryAddress.mobile},{details.DeliveryAddress.alternate}
            </Row>
            <Row>Payment to be recieved:<b>₹{details.total}/- Only </b> </Row>
            <Row>Change Status: 
                <DropdownButton id="dropdown-update-button" variant={deliveryStatus===currentButton?'success':'secondary'} title={statusText}>
                   <DropOptions/>
                </DropdownButton>
            </Row>
            </Col>
            </Row>
            <Row className="bg-light">
                <Col><Button variant="outline-secondary"> View   in Map <FaGlobeAmericas/></Button></Col>
                <Col>{deliveryStatus!==DELIVERED?<Button variant="outline-warning" onClick={handleUpdate} > Update <TiTick/></Button>:<></>}</Col>
                <Col><Button variant="outline-primary" onClick={()=>props.changePage(ORDER)}><IoIosArrowBack/>Back</Button></Col>
            </Row>
        </Container>
)
}
export default OrderDetails;