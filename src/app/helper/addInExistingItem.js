import { db } from "../../firebaseConnect";
import { SELLER_ITEM } from "../AppConstant";

export const addInExistingItem=(data)=>{
  return  db.collection(SELLER_ITEM).add(data).then(id=>{
        return true;
    }).catch(err=>{
        console.log('somr thing went wrong '+err);
        return false;
    })
}