import { db } from "../../firebaseConnect"

export const getItemFromDb=(id)=>{
var docRef = db.collection("products").doc(id);
return docRef.get().then(function(doc) {
    if (doc.exists) {
        return doc.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return false;
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
    return false;
});
}