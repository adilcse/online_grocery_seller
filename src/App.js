import React,{Suspense,lazy, useState} from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoginStatus } from './redux/actions/UserAction';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Loading from './components/Loading';
import LoginScreen from './container/LoginScreen';

const SellerUserRoute=lazy(()=>import('./app/routes/SellerUserRoute'));

/**
 * main component which contain all route
 */
function App() {
  let dispatch = useDispatch();
  const user=useSelector(state=>state.userLogin);
  const [statusLoaded,setStatusLoaded]=useState(false)
  if(!statusLoaded){
    LoginStatus(dispatch);
    setStatusLoaded(true)
  }
  if(user.loggedIn){
  return (
  <Router>
      <Suspense fallback={<Loading size={100}/>}>
       <SellerUserRoute/>
      </Suspense>
    </Router>
  );}
  else{
    return(
      <Router>
        <Suspense fallback={<Loading size={100}/>}>
          <LoginScreen/>
        </Suspense>
      </Router>
    )
  }
}

export default App;
