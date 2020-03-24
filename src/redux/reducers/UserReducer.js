import { 
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER_FAILED,
    LOGOUT_USER_PENDING,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_PENDING,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    PLEASE_REGISTER_FIRST,
 } from "../../app/ActionConstant";
 import { 
    USER_TYPE_SELLER
 } from "../../app/AppConstant";
 let initialState={
     userId:null,
     email:null,
     name:null,
     loggedIn:false,
     userType:null,
     loggingIn:false,
     error:false,
     registerByGoogle:false,
     coordinates:null


 }
export const userLogin=(state=initialState,action={})=>{
     switch(action.type){
         case LOGIN_USER_PENDING:
             return {...state,loggingIn:true,loggedIn:false};
         case LOGIN_USER_SUCCESS:
            return{...state,
                userId:action.payload.uid,
                email:action.payload.email,
                loggingIn:false,
                loggedIn:true, 
                name:action.payload.name,
                userType:action.payload.userType,
                address:action.payload.address,
                error:false,
                coordinates:action.payload.coordinates,
            } 
       
        case LOGIN_USER_FAILED:
            return {...state,...initialState,error:action.payload};
        case LOGOUT_USER_FAILED:
            return {...state,error:action.error}   
        case LOGOUT_USER_SUCCESS:
            return {...initialState};
        case LOGOUT_USER_PENDING:
            return {...state,loggingIn:true}        
        
        case REGISTER_USER_PENDING:
            return {...state,loggingIn:true,loggedIn:false};
        case REGISTER_USER_SUCCESS:
            return{...state,
                userId:action.payload.uid,
                email:action.payload.email,
                loggingIn:false,
                loggedIn:true,
                userType:USER_TYPE_SELLER,
           
                error:false
            } 
        case REGISTER_USER_FAILED:
            return{...state,
                userId:null,
                userName:null, 
                loggedIn:false,
                loggingIn:false,
                error:action.payload,  
            }  
        case PLEASE_REGISTER_FIRST:
            return{...state,
                registerByGoogle:true,
                userDetails:action.payload
            }
        default:    
            return state;
     }
 }