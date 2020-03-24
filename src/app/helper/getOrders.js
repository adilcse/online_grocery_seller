import { db } from "../../firebaseConnect"

export const getOrders=(sellerId,fun,lmt=10)=>{
    return db.collection('sellerOrders').where('sellerId','==',sellerId).orderBy("orderedOn",'desc').limit(lmt)
        .onSnapshot(snapshot=>{
             fun(snapshot.docChanges());
        })
}