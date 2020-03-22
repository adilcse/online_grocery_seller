import { db } from "../../firebaseConnect"
/**
 * update data in the collection
 * @param {*} coll collection name
 * @param {*} docId document id
 * @param {*} data data to update
 */
export const documentUpdate=(coll,docId,data)=>{
   return db.collection(coll).doc(docId).update(data).then(()=>true).catch(()=>false)
}