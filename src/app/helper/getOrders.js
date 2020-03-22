import { db } from "../../firebaseConnect"

export const getOrders=(sellerId,fun)=>{
    return db.collection('sellerOrders').where('sellerId','==',sellerId).orderBy("orderedOn").limit(5)
        .onSnapshot(snapshot=>{
             fun(snapshot.docChanges());
        })
}