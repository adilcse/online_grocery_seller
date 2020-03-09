import React from 'react';
import { Alert } from 'react-bootstrap';
/**
 * shows error message if anythng went wrong
 * @param {isError,message} props 
 */
 const ErrorMessage=(props)=>{
    if(props.isError)
    return(
    <Alert variant='danger'>
        <Alert.Heading>{props.message}</Alert.Heading>
   </Alert>
    )
    else 
       return <></>
 }
 export default ErrorMessage;