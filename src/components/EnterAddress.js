/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import './EditAddress.css'
import { Form, Col, Button } from 'react-bootstrap';
import {INPUT_PIN, INPUT_LANDMARK, INPUT_LOCALITY, INPUT_ADDRESS, INPUT_CITY, INPUT_STATE, INPUT_ALTERNATE} from '../app/AppConstant';
import ErrorMessage from '../app/helper/ErrorMessage';

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
  landmark:/^[a-zA-Z0-9\- ]{0,}$/
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
  const [error,showError]=useState(false)
  //when submit button is clicked it handles
    const handleSubmit=()=>{
      let correct=true;
     Object.keys(regex).forEach((key)=>{
   
       if(!touched[key] && fullAddress){
       
        if(!validate(key,fullAddress[key]))
            correct=true;
          else
            correct=false;
        }else{
          touched[key]=true;
          if(errors[key]){
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
    touched[id]=true;
    if(id==='state'){
      if(val!==1)
      errors[id]=false;
    else
      errors[id]=true;
    }else{
      if(regex[id].test(val))
        errors[id]=false;
    else
      errors[id]=true;

    }
    setFun(val);
    return errors[id];
    }
   
    //when user types something it checks for input validation
    const handleChange=(element)=>{
      let val=element.target.value;
      switch(element.target.id){
        case INPUT_PIN:
          validate('pin',val,setPin)
          break;  
        case INPUT_LOCALITY:
          validate('locality',val,setLocality)
          break;    
        case INPUT_ADDRESS:
          validate('address',val,setAddress)
          break;  
        case INPUT_CITY:
          validate('city',val,setCity)
          break;            
        case INPUT_STATE:
          validate('state',val,setState)
          break;         
        case INPUT_LANDMARK:
          touched.landmark=true;
          errors.landmark=false;
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
            <Form.Group as={Col} md="6" controlId={INPUT_PIN}>
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="number"
                name="pin"
                placeholder='PIN'
                value={pin}
                onChange={handleChange}
                isValid={touched.pin && !errors.pin}
                isInvalid={touched.pin && errors.pin}
                maxLength={6}
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
              isValid={touched.locality && !errors.locality}
              isInvalid={touched.locality && errors.locality}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
         
            </Form.Group>
           
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} md='12' controlId={INPUT_ADDRESS}>
            <Form.Label>Address (Area and Street)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows="3"
              value={address}
              onChange={handleChange}
              isValid={touched.address && !errors.address}
              isInvalid={touched.address && errors.address}
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
              isValid={touched.city && !errors.city}
              isInvalid={touched.city && errors.city}
              
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
              isValid={touched.state && !errors.state}
              isInvalid={touched.state && errors.state}
              >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
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
                isValid={touched.landmark && !errors.landmark}
                isInvalid={touched.landmark && errors.landmark}
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
              isValid={touched.alternate && !errors.alternate}
              isInvalid={touched.alternate && errors.alternate}
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