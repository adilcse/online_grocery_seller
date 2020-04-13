import { deleteItemAPI } from "./laravelAPI";
import { firebase } from "../../firebaseConnect";

export const deleteSellerItems=async(user,ids,items)=>{
    if(ids.length>0){
        var storageRef = firebase.storage();
        items.forEach(element => {
            storageRef.refFromURL(element.image).delete();
        });
        console.log(ids)
      return deleteItemAPI(user,ids.join())
        .then(res=>{
            if(res.error || res.status<1)
                return false;
            else
                return true;
        })
        .catch(err=>false);
    }
    else{
         return false;
    }
}