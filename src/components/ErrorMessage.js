import React from 'react';
import { Alert } from 'react-bootstrap';
/**
 * shows error message if anythng went wrong
 * @param {isError,message} props 
 */
 const ErrorMessage=(props)=>{
    if(props.isError)
    return(
       <div className={props.className}>
    <Alert variant='danger'>
        <Alert.Heading>{props.message}</Alert.Heading>
   </Alert>
   </div>
    )
    else 
       return <></>
 }
 export default ErrorMessage;