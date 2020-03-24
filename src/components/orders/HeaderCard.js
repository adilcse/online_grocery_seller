import React from 'react';
import { Row, Col } from 'react-bootstrap';
const  HeaderCard=(props)=>{
    const ordered=props.orderedOn?props.orderedOn.toDate().toLocaleString():null;
    const delivered=props.deliveredOn?props.deliveredOn.toDate().toLocaleString():null;
    
    return(
    <Row>
        <Col className='text-left' xs='12' md='6'>
        Ordered On : {ordered}
        </Col>
        <Col className='text-right' xs='12' md='6'>
        Delivered On : {delivered?delivered:'Pending'}
        </Col>

    </Row>
)
}
export default HeaderCard;