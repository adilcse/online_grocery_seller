import React, { useState } from 'react';
import Login from '../components/signin/Login';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { USER_TYPE_SELLER, LOGIN, ADDRESS, REGISTER } from '../app/AppConstant';
import Register from '../components/signin/Register';
import GpsAddress from '../components/GpsAddress';
let changed=false;
let details=null;
const LoginScreen=()=>{
    const user=useSelector(state=>state.userLogin);
    const [address,setAddress]=useState(false)
    const [tab,setTab]=useState(LOGIN);
    
    if(!changed && user.registerByGoogle){
        details=user.userDetails;
        setTab(REGISTER);
    }
    const setAddressFun=(address)=>{
        console.log(address)
        setAddress(address);
        setTab(REGISTER);
    }
    if(user.loggedIn && user.userType!==USER_TYPE_SELLER){
        return(
        <div className='text-center'>
       <h1> Sorry!!! you are not a seller...</h1>
           {tab===LOGIN? <Login change={setTab}/> :<Register change={setTab} address={address} details={details}/>}
        </div> 
        )
    }else if(!user.loggedIn){
        if(tab===ADDRESS){
            return(<GpsAddress setAddress={setAddressFun} />)
        }
        return(
            <div className='mt-3'>
                 {tab===LOGIN? <Login change={setTab}/> :<Register change={setTab}  address={address} details={details}/>}
            </div>
        )
    }else{
        return <Redirect to='/home'/>
    }
}
export default LoginScreen;