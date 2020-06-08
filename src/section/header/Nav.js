import React from 'react';
import { IoIosHome,IoIosList } from "react-icons/io";
import {FaPlus} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../../redux/actions/UserAction';

const SellerNav = ()=>{
    const user=useSelector(state=>state.userLogin);
    const dispatch=useDispatch();
    
const LogoutButton=()=>{
    return (
    <NavLink to='/' className='nav-item ml-auto mr-2'>
        <Button onClick={()=>Logout(dispatch)}>Logout</Button>
    </NavLink>
     )
}
  let collapse = true;
    const toggle=()=>{
      if(collapse){
        document.getElementById("navbarSupportedContent").style.display = 'block';        
      }else{
        document.getElementById("navbarSupportedContent").style.display = 'none';
      }
      collapse = !collapse;

    }
    return( 
<nav className="navbar navbar-expand-md navbar-light bg-light">
  <button className="navbar-toggler ml-auto mr-2" type="button" data-toggle="collapse" onClick={toggle} data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav w-100 ">
     
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="bg-info text-white" to="/home">Dashbord <IoIosHome/></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="bg-info text-white" to="/orders">Orders<IoIosList/></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="bg-info text-white" to="/additem">Add Item <FaPlus/></NavLink>
      </li>
      <li className="nav-item align-self-center">
        <h5 className="mb-0">Welcome {user.name}</h5>
      </li>
      <LogoutButton />      
    </ul>
  </div>
</nav>
    )
   
}
export default SellerNav;