import { db } from "../../firebaseConnect";
import { getFromDb } from "./getFromDb";

const getSellerItems=(sellerId,after=false,lmt=5)=>{
    const baseQuery=db.collection('sellerItems').where('sellerId','==',sellerId).orderBy('addedOn','desc').limit(lmt);
    const query=after?baseQuery.startAfter(after):baseQuery;
    return getFromDb(query);
}
export default getSellerItems;