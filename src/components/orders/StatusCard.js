import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import{IoMdCheckmark,IoMdDocument,IoMdClose} from 'react-icons/io';
import { PENDING, REJECT } from '../../app/AppConstant';
import { changeStatusText } from '../../app/helper/changeStatusText';
const StatusCard=(props)=>{
    const {total}=props;
return(
    <Container  >
        <Row className='border-bottom'>
            <Col md='6' xs='12' className='text-left border-bottom'>
              
                <Row>
                    <Col md='4' xs='6'>
                    Payment mode  
                    </Col>
                    <Col md='8' xs='6'>
                    {props.paymentMode}
                    </Col>
                </Row>
                <Row>
                    <Col md='4' xs='6'>
                    Address 
                    </Col>
                    <Col md='8' xs='6' className='text-truncate'>
                    {props.address.address}
                    </Col>   
                </Row>
                <Row className='h5'>
                    <Col md='4' xs='6'>
                     status 
                    </Col>
                    <Col md='8' xs='6'>
                     {changeStatusText(props.state)}
                    </Col>    
                </Row>
              
                
            </Col>
            <Col md='4' xs='12' className='ml-auto text-left'>
                <Row>
                    <Col md='8' xs='8'>
                    Sub Total 
                    </Col>
                    <Col md='4' xs='4'>
                    ₹{total.subTotal}
                    </Col>
                </Row>
                <Row className='border-bottom pb-3'>
                    <Col md='8' xs='8'>
                    Delevery Charges  
                    </Col>
                    <Col md='4' xs='4'>
                    ₹{total.deliveryCharges} 
                    </Col>   
                </Row>
                <Row className='h5'>
                    <Col md='8' xs='8'>
                    Grand Total 
                    </Col>
                    <Col md='4' xs='4' className='d-flex'>
                    ₹{total.total}
                    </Col>    
                </Row>

            </Col>
        </Row>
        <Row className='justify-content-center'>
            <Col>{props.state===PENDING?<Button className="outline-success" variant="outline-success" onClick={()=>props.onAccept(true)}>Confirm<IoMdCheckmark/></Button>:<></>}</Col>
            <Col>{(props.state!==PENDING && props.state!==REJECT)?<Button variant="outline-warning" onClick={()=>props.viewDetails()}> View details<IoMdDocument/></Button>:<></>}</Col>
            <Col>{props.state===PENDING?<Button className="outline-danger" variant="outline-danger" onClick={()=>props.onAccept(false)}>Cancel<IoMdClose/></Button>:<></>}</Col>
        </Row>
    </Container>
)
}
export default StatusCard; 