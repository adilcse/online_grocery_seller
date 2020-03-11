import { db } from "../../firebaseConnect"
import { getFromDb } from "./getFromDb";

export const getItemsByIds=(ids)=>{
    let query= db.collection('products').where('id','in',ids);
    return getFromDb(query);
}