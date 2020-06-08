/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import './EditAddress.css'
import { Form, Col, Button } from 'react-bootstrap';
import {INPUT_PIN, INPUT_LANDMARK, INPUT_LOCALITY, INPUT_ADDRESS, INPUT_CITY, INPUT_STATE, INPUT_ALTERNATE} from '../app/AppConstant';
import ErrorMessage from '../app/helper/ErrorMessage';
import { indianStates } from '../app/helper/indianStates';

//keeps track of thee field touched
let touched={
  pin:false,
  locality:false,
  address:false,
  city:false,
  state:false,
  landmark:false,
  alternate:false

};
//keeps track of the feilds having error
let errors={
  pin:true,
  locality:true,
  address:true,
  city:true,
  state:true,
  landmark:false,
  alternate:false

};
//rex for all fields
const regex={
  address:/^[0-9a-zA-Z\-,\/\\ \n]{3,}$/,
  pin:/^[0-9]{6}$/,
  locality:/^[0-9a-zA-Z\-, ]{3,}$/,
  city:/^[a-zA-Z\-, ]{3,}$/,
  alternate:/^[ ]{0}|[0-9]{10}$/,  
  landmark:/^[a-zA-Z0-9\- ]{0,}$/,
  state:/^[a-zA-Z0-9\- ]{0,}$/
}

const EnterAddress=(props)=>{
  const{buttonText}=props;
  let {fullAddress}=props;
  if(fullAddress)
    fullAddress = Object.keys(fullAddress).length === 0 ? null : fullAddress;
  const [pin,setPin]=useState(fullAddress?fullAddress.pin:'')
  const [locality,setLocality]=useState(fullAddress?fullAddress.locality:'')
  const [address,setAddress]=useState(fullAddress?fullAddress.address:'')
  const [city,setCity]=useState(fullAddress?fullAddress.city:'')
  const [state,setState]=useState(fullAddress?fullAddress.state:'')
  const [landmark,setLandmark]=useState(fullAddress?fullAddress.landmark:'')
  const [alternate,setAlternate]=useState(fullAddress.alternate?fullAddress.alternate:' ');
  const [updated,setUpdated]=useState(true);
  const [changed,setChanged]=useState(false);
  const [error,showError]=useState(false);
  const [touchedState,setTouchedState]=useState(touched);
  const [errorState,setErrorState]=useState(errors);

  //when submit button is clicked it handles
    const handleSubmit=()=>{
      let correct=true;
      Object.keys(regex).forEach((key)=>{
        if(!touchedState[key] && fullAddress){
          if(validate(key,fullAddress[key]))
            correct=true;
          else
            correct=false;
        }else{
          setTouchedState({...touchedState,[key]:true});
          if(errorState[key]){
            correct=false;
          }
        }
      });
      if(correct){
        saveAddress();
        setUpdated(!updated);
      }
      else
        showError(true);
    }
    //if entered data is correct it send user to next page
    const saveAddress=()=>{
      let fullAddress={
        locality:locality,
        pin:pin,
        address:address,
        city:city,
        state:state,
        landmark:landmark,
        alternate:alternate,  
        formatted_address:(address?address+', ':'')
                          +(locality?locality+', ':'')
                          +(landmark?landmark+', ':'')
                          +(state?state+', ':'')
                          +(pin?pin:'')       
      }
  
      props.setValidAddress(true,fullAddress);
    }
    const validate=(id,val,setFun=()=>true)=>{
      const error=!regex[id].test(val);
      setErrorState({...errorState,[id]:error})
      setFun(val);
      return !error;
    }
   
    //when user types something it checks for input validation
    const handleChange=(element)=>{
      let val=element.target.value;
      switch(element.target.id){
        case INPUT_PIN:
          setTouchedState({...touchedState,pin:true});
          validate('pin',val,setPin)
          break;  
        case INPUT_LOCALITY:
          setTouchedState({...touchedState,locality:true});
          validate('locality',val,setLocality)
          break;    
        case INPUT_ADDRESS:
          setTouchedState({...touchedState,address:true});
          validate('address',val,setAddress)
          break;  
        case INPUT_CITY:
          setTouchedState({...touchedState,city:true});
          validate('city',val,setCity)
          break;            
        case INPUT_STATE:
          setTouchedState({...touchedState,state:true});
          validate('state',val,setState)
          break;         
        case INPUT_LANDMARK:
          setTouchedState({...touchedState,landmark:true});
          setErrorState({...errorState,landmark:false});
            setLandmark(val);
          break;
        case INPUT_ALTERNATE:
          validate('alternate',val,setAlternate)
          break;   
          default:
            return;            
      }
    }
    if(!changed && fullAddress){
      validate('address',fullAddress.address,setAddress); 
      validate('pin',fullAddress.pin,setPin);
      validate('locality',fullAddress.locality,setLocality);
      validate('city',fullAddress.city,setCity);
      validate('alternate',fullAddress.alternate,setAlternate);
      validate('state',fullAddress.state,setState)
      validate('landmark',fullAddress.landmark,setLandmark)
      setChanged(true);
    }
  
return(
<div className="address">
  <ErrorMessage isError={error} message='please enter correct details'/>
    <div>
      <Form>
          <Form.Row>
          <Form.Group as={Col} md='12' controlId={INPUT_ADDRESS}>
            <Form.Label>Address (Area and Street)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows="3"
              value={address}
              onChange={handleChange}
              isValid={touchedState.address && !errorState.address}
              isInvalid={touchedState.address && errorState.address}
              />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="6" controlId={INPUT_PIN}>
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="number"
                name="pin"
                placeholder='PIN'
                value={pin}
                onChange={handleChange}
                isValid={touchedState.pin && !errorState.pin}
                isInvalid={touchedState.pin && errorState.pin}
                maxLength={6}
                required
              />
              <Form.Control.Feedback type='invalid'>Please Enter correct pin code</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId={INPUT_LOCALITY}>
              <Form.Label>Locality</Form.Label>
            <Form.Control
              type="text"
              placeholder="Locality"
              aria-describedby="inputGroupPrepend"
              value={locality}
              onChange={handleChange}
              isValid={touchedState.locality && !errorState.locality}
              isInvalid={touchedState.locality && errorState.locality}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        <Form.Row>
        <Form.Group as={Col} md="6" controlId={INPUT_CITY}>
            <Form.Label>City/District/Town</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              value={city}
              onChange={handleChange}
              isValid={touchedState.city && !errorState.city}
              isInvalid={touchedState.city && errorState.city}
              
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your City
            </Form.Control.Feedback>
            </Form.Group>  
            <Form.Group as={Col} md='6' controlId={INPUT_STATE}>
            <Form.Label>State</Form.Label>
            <Form.Control as="select" 
              value={state}
              onChange={handleChange}
              isValid={touchedState.state && !errorState.state}
              isInvalid={touchedState.state && errorState.state}
              >
              {
                indianStates.map((name,i)=>
                  <option key={i} value={name}>{name}</option>
                )
              }
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
        </Form.Group>        
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="6" controlId={INPUT_LANDMARK}>
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                placeholder='Landmark (Optional)'
                value={landmark}
                onChange={handleChange}
                isValid={touchedState.landmark && !errorState.landmark}
                isInvalid={touchedState.landmark && errorState.landmark}
                maxLength={20}
              />
              <Form.Control.Feedback type='invalid'>Enter valid landmark</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId={INPUT_ALTERNATE}>
              <Form.Label>Alternate Number</Form.Label>
              
            <Form.Control
              type="text"
              placeholder="Alternate Number (optional)"
              aria-describedby="inputGroupPrepend"
              value={alternate}
              onChange={handleChange}
              isValid={touchedState.alternate && !errorState.alternate}
              isInvalid={touchedState.alternate && errorState.alternate}
              maxLength={10}
            
            />
             <Form.Control.Feedback type='invalid'>Enter valid number (Optional)</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row className='text-center'>
          <Button variant="warning" size='lg' className='mr-3' onClick={handleSubmit}>{buttonText?buttonText:'Delever to this Address'}</Button>
          <Button variant="danger" size='lg' onClick={()=>props.setValidAddress(false)}>Cancel</Button>
          </Form.Row>
          </Form>     
    </div>
</div>     
          
)
}
export default EnterAddress;