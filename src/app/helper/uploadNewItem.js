import { db } from "../../firebaseConnect"
import { firebase } from "../../firebaseConnect";
import { SELLER_ITEM } from "../AppConstant";
export const uploadNewItem=(data)=>{
return db.collection(SELLER_ITEM).add({
  sellerId:data.sellerId,
  price:data.price,
  discount:data.discount,
  stock:data.stock,
  name:data.name,
  catagory:data.catagory,
  description:data.description,
  image:null,
  addedOn:firebase.firestore.FieldValue.serverTimestamp()
}).then(docRef=>{
  console.log('added to seller item id:'+docRef.id)
  uploadImage(data.image,docRef.id);
  return true;
}).catch(err=>{
  console.log('somr thing went wrong '+err);
  return false;
});
}
/**
 * upload the image to cloud storage by product id as name
 * @param {*} file image to upload
 * @param {*} id id of image in database
 */
const uploadImage=(file,id)=>{
    var storageRef = firebase.storage().ref('products/images');
let metadata = {
    contentType: file.type
  };
  const uploadTask = storageRef.child(id).put(file, metadata);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
        default:
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
      default:
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    setImageUrl(downloadURL,id);
  });
});
}
/**
 * after uploading image update the url in database
 * @param {*} url image url
 * @param {*} id product id
 */
const setImageUrl=(url,id)=>{
    db.collection(SELLER_ITEM).doc(id).update({
        image:url
    }).then(function() {
        console.log("Document successfully updated!");

    })
}
