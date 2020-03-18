import { db } from "../../firebaseConnect"
import { firebase } from "../../firebaseConnect";
import { getproducts } from "./getProducts";
/**
 * gives all the items of requested ids
 * @param {*} ids product ids to get from database
 * @param {*} col collection name default id sellerItems
 */
export const getItemsByIds=async(ids,col='sellerItems')=>{
    let result=[];
    for(let i=0;i<ids.length;i+=10){
    let query= db.collection(col).where(firebase.firestore.FieldPath.documentId(),'in',ids.slice(i,i+10));
    const res=await getproducts(query);
        result=result.concat(res);
    }
    return result;
}