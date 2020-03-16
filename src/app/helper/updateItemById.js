import { db } from "../../firebaseConnect";

const updateItemById=(itemId,cellName,cellValue)=>{
db.collection('sellerItems').doc(itemId)
.update({
    [cellName]:cellValue
}).then(()=>{
    return true;
}).catch(()=>{
    return false;
})
}
export default updateItemById;