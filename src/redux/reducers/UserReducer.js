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
 let initialState={
     userId:null,
     email:null,
     name:null,
     loggedIn:false,
     userType:null,
     loggingIn:false,
     error:false,
     registered:false

 }
export const userLogin=(state=initialState,action={})=>{
     switch(action.type){
         case LOGIN_USER_PENDING:
             return {...state,loggingIn:true,loggedIn:false, registered:false};
         case LOGIN_USER_SUCCESS:
            return{...state,
                userId:action.payload.uid,
                email:action.payload.email,
                loggingIn:false,
                loggedIn:true, 
                name:action.payload.name,
                id:action.payload.id,
                userType:action.payload.current_status,
                address:action.payload.address,
                user:action.payload.user,
                error:false,
                registered:false
            } 
       
        case LOGIN_USER_FAILED:
            return {...state,...initialState,error:action.payload?action.payload:state.error, registered:false};
        case LOGOUT_USER_FAILED:
            return {...state,error:action.error}   
        case LOGOUT_USER_SUCCESS:
            return {...initialState,error:state.error};
        case LOGOUT_USER_PENDING:
            return {...state,loggingIn:true,  registered:false}        
        
        case REGISTER_USER_PENDING:
            return {...state,loggingIn:true,
                    loggedIn:false,  
                    registered:false,
                    registerError:false};
        case REGISTER_USER_SUCCESS:
            return{...state,
                loggingIn:false,
                registered:true,
                registerError:false
            } 
        case REGISTER_USER_FAILED:
            return{...state,
                userId:null,
                userName:null, 
                loggedIn:false,
                loggingIn:false,
                registerError:action.payload,  
                registered:false
            }  
        case PLEASE_REGISTER_FIRST:
            return{...state,
                userDetails:action.payload,
                registered:false
            }
        default:    
            return state;
     }
 }