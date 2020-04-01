import { LOGOUT_USER_PENDING, LOGOUT_USER_SUCCESS,LOGOUT_USER_FAILED, LOGIN_USER_PENDING, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, REGISTER_USER_PENDING } from "../../app/ActionConstant";
import {firebase, db } from '../../firebaseConnect';
import {  SELLER_VERIFICATION_PENDING, USER_TYPE_SELLER } from "../../app/AppConstant";
import * as geofirex from 'geofirex';
const geo = geofirex.init(firebase);
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
dispatch({type:REGISTER_USER_PENDING});
registering=true;
firebase.auth().createUserWithEmailAndPassword(email, password)
.then((data)=>{
  addUserToDb(dispatch,data.user.uid,data.user.email,name,address,number);
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
  db.collection("seller").doc(user.uid).get().then(function(doc) {
    if (doc.exists) {
     if(doc.data().userType===USER_TYPE_SELLER)
          dispatch({type:LOGIN_USER_SUCCESS,payload:{...user,...doc.data()}});
      else{
        dispatch({type:LOGIN_USER_FAILED,payload:{code:'Seller Activation pending. please contact admin.'}});
        Logout(dispatch);

      }
      
    } else {
        // doc.data() will be undefined in this case
        console.log("use not exist...");
       
          dispatch({type:LOGIN_USER_FAILED,payload:{code:'user not exist'}});
          Logout(dispatch);
        

    }
}).catch(function(error) {
  dispatch({type:LOGIN_USER_FAILED,payload:{code:'no Internet'}});
    console.log("Error getting document:", error);
});
}
const addUserToDb=async(dispatch,userId,email,name,address,number)=>{
  const seller={
    email: email,
    name:name,
    userType:SELLER_VERIFICATION_PENDING,
    id:userId,
    dateOfJoining:firebase.firestore.FieldValue.serverTimestamp(),
    address:address.formatted_address,
    mobile:number,
  }
  const position=geo.point(address.latLng.latitude,address.latLng.longitude);
  db.collection("seller").doc(userId).set({
   ...seller,position
})
.then(function() {
  registering=false;
   dispatch({type:REGISTER_USER_SUCCESS,payload:seller});
   Logout(dispatch);
})
.catch(function(error) {
  registering=false;
    console.error("Error writing document: ", error);
    dispatch({type:REGISTER_USER_FAILED,payload:error})
})
}
