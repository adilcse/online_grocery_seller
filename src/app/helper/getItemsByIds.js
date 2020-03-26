import { db } from "../../firebaseConnect"
import { firebase } from "../../firebaseConnect";
import { getproducts } from "./getProducts";
/**
 * gives all the items of requested ids
 * @param {*} ids product ids to get from database
 * @param {*} col collection name default id sellerItems
 */
export const getItemsByIds=async(ids,items=null)=>{
    let result=[];
    const itemsToFetch=[];
    if(items){
        ids.forEach(id=>{
            const item=items.find(el=>el.id===id);
            if(item)
                result.push(item)
            else
                itemsToFetch.push(id)
        });}
    for(let i=0;i<itemsToFetch.length;i+=10){
        console.log('inloop')
    let query= db.collection('sellerItems').where(firebase.firestore.FieldPath.documentId(),'in',itemsToFetch.slice(i,i+10));
    const res=await getproducts(query);
        result=result.concat(res);
    }
    return result;
}