import { LOGOUT_USER_PENDING, LOGOUT_USER_SUCCESS,LOGOUT_USER_FAILED, LOGIN_USER_PENDING, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, REGISTER_USER_PENDING } from "../../app/ActionConstant";
import {firebase } from '../../firebaseConnect';
import {  PENDING, ACTIVE } from "../../app/AppConstant";
import { registerSellerAPI, loginSellerAPI } from "../../app/helper/laravelAPI";
/**
 * Tries to signin with given email and password
 * if verifies logsin the user
 * @param {dispatch} dispatch dispath hook
 * @param {'test@test.com'} email email for user login
 * @param {'*******'} password user's pasword
 */
let registering=false;
export const EmailLogin=(dispatch,email,password)=>{
    dispatch({ type: LOGIN_USER_PENDING});
    //handles user signin
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user=>{
     // LoginStatus(dispatch);
    })
      .catch(function(error) {
        // Handle Errors here.
        dispatch({type:LOGIN_USER_FAILED,payload:{...error}})
        // ...
      });
};
/**
 * When user's hit login with google it logs in with google auth
 * if user's exist it
 * @param {*} dispatch dispatch hook
 */
/**
 * user register with firebase auth and add data to firebase database
 * @param {*} name name of the user
 * @param {*} email email id of the user
 * @param {*} password password to set
 */
export const Register =(dispatch,name,email,password,address,number)=>{
  console.log(address)
dispatch({type:REGISTER_USER_PENDING});
registering=true;
firebase.auth().createUserWithEmailAndPassword(email, password)
.then((data)=>{
  addUserToDb(dispatch,data.user,name,address,number);
})
.catch(function(error) {
  registering=false;
  console.log(error);
  dispatch({type:REGISTER_USER_FAILED,payload:{...error}});
  // ...
});

}

export const Logout=(dispatch)=>{
    dispatch({type:LOGOUT_USER_PENDING})
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        dispatch({type:LOGOUT_USER_SUCCESS });
      }).catch(function(error) {
        // An error happened.
        dispatch({LOGOUT_USER_FAILED});
      });
}
export const LoginStatus=async(dispatch)=>{
  console.log('status pending')
  dispatch({ type: LOGIN_USER_PENDING});
  firebase.auth().onAuthStateChanged(function(user) {
    if (user && !registering) {
        ValidateUser(dispatch,user);
    } else if(!user) {
      // No user is signed in.
      dispatch({type:LOGIN_USER_FAILED})

    }
  });
}

export const ValidateUser=async(dispatch,user,by='email')=>{
  // db.collection("seller").doc(user.uid).get()
  loginSellerAPI(user)
  .then(function(doc) {
     if(doc.current_status===ACTIVE)
          dispatch({type:LOGIN_USER_SUCCESS,payload:{user:user,...doc}});
      else{
        dispatch({type:LOGIN_USER_FAILED,payload:{code:'Seller Activation pending. please contact admin.'}});
        Logout(dispatch);
      }
}).catch(function(error) {
  dispatch({type:LOGIN_USER_FAILED,payload:{code:'Seller Activation pending. please contact admin.'}});
    console.log("Error getting document:", error);
    Logout(dispatch);
});
}
const addUserToDb=async(dispatch,user,name,address,number)=>{
  const seller={
    email: user.email,
    name:name,
    current_status:PENDING,
    uid:user.uid,
    address:address,
    mobile:number,
  }

registerSellerAPI(user,seller)
.then(function() {
  registering=false;
   dispatch({type:REGISTER_USER_SUCCESS,payload:seller});
   Logout(dispatch);
})
.catch(function(error) {
  registering=false;
    console.error("Error writing document: ", error);
    user.delete().then(function() {
      console.log('user deleted');
    }).catch(function(error) {
      // An error happened.
    });
    dispatch({type:REGISTER_USER_FAILED,payload:error})
})
}
