import { db } from "../../firebaseConnect";
import { getFromDb } from "./getFromDb";

const getSellerItems=(sellerId)=>{
const query=db.collection('sellerItems').where('sellerId','==',sellerId);
return getFromDb(query);

}
export default getSellerItems;