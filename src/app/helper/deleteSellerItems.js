import { db } from "../../firebaseConnect"

export const deleteSellerItems=(sellerId,itemIds)=>{
    const batch=db.batch();
    itemIds.forEach(element => {
        const q=db.collection('sellerItems').doc(element);
        batch.delete(q);
    });
   return batch.commit();
}