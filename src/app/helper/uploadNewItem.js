import { firebase } from "../../firebaseConnect";
import { addItemAPI } from "./laravelAPI";
export const uploadNewItem=async(user,data)=>{

const res=await uploadImage(user,data);
  return addItemAPI(user,{...data,image:res})
    .then(id=>{
      console.log('added to seller item id:'+id)
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
const uploadImage=(user,data)=>{
  const file=data.image;
  const id=user.uid+new Date().getTime();
    var storageRef = firebase.storage().ref('products/images');
let metadata = {
    contentType: file.type
  };
  const uploadTask = storageRef.child(id).put(file, metadata);
  return uploadTask.then(async(snapshot)=>{
    return await snapshot.ref.getDownloadURL();
  })

}

