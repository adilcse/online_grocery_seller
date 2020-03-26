import { db } from "../../firebaseConnect";
import { getFromDb } from "./getFromDb";
/**
 * make query to database to fetch data and return promise
 * @param {*} sellerId id of seller
 * @param {false,any} after after a point default false
 * @param {*} lmt limit of items to fetch
 * @returns Promise with data
 */
const getSellerItems=(sellerId,after=false,lmt=100)=>{
    const baseQuery=db.collection('sellerItems').where('sellerId','==',sellerId).orderBy('addedOn','desc').limit(lmt);
    const query=after?baseQuery.startAfter(after):baseQuery;
    return getFromDb(query);
}
export default getSellerItems;