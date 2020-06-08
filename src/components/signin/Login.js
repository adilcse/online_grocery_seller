import React from 'react';
import './Signin.css';
import { useDispatch, useSelector} from 'react-redux';
import { EmailLogin } from "../../redux/actions/UserAction";
import Loading from '../Loading';
/**
 * displays login form to the user
 * @param {hideSignup} props to dide signup button
 */
const Login = (props)=>{
const dispatch = useDispatch();
   /**
    * try to login by users entered email and password
    */
   const tryLogin=()=>{
      let email=document.getElementById("email").value;
      let password=document.getElementById("password").value;
      EmailLogin(dispatch,email,password);
   }
   /**
    * tries to login with google signin
    */
   
   const clear = ()=>{
      document.getElementById("email").value='';
      document.getElementById("password").value='';
   }
   const user=useSelector(state=>state.userLogin)
   const loggingIn=user.loggingIn;
   const LoginButtons=()=>{
   if(!loggingIn)
   return( 
      <>
         <div className="row justify-content-center">
            <div className="col-sm-5 text-center mt-3">
               <button className=" btn btn-block mybtn btn-warning tx-tfm" onClick={tryLogin}>Login</button>
            </div>
            <div className="col-sm-5 text-center mt-3">
               <button className=" btn btn-block mybtn btn-warning tx-tfm" onClick={clear}>Clear</button>
            </div>
         </div>
         <div className="col-md-12 ">
            <div className="login-or">
               <hr className="hr-or"/>
               <span className="span-or">or</span>
            </div>
         </div>
         {props.hideSignup?<></>:
         <div className="form-group">
            <p className="text-center">
               Don't have account? 
               <button className="btn bg-warning ml-2" onClick={()=>props.change('register')}>Sign up here</button>
            </p>
         </div>}
      </>
   );
   else 
      return(
         <Loading size={80}/>
      )
   }

   return(
      <div id="first">
         <div className="myform form ">
            <div className="logo mb-3">
               <div className="col-md-12 text-center">
                  <h1>Login</h1>
                  {user.error?<h5 className='text-danger'>{user.error.code}</h5>:<></>}
               </div>
            </div>  
            <form>         
            <div className="form-group">
               <label htmlFor="exampleInputEmail1">Email address</label>
               <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
               <label htmlFor="exampleInputEmail1">Password</label>
               <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
            </div>
            </form>  
            <LoginButtons/>
         </div>
      </div>
    )
}
export default Login;