import { LARAVEL_API_URL } from "../AppConstant";
/**
 * register user to database
 * @param {*} user firebase user auth obj
 * @param {*} data users details to be registered
 */
export const registerSellerAPI=async(user,data)=>{
    const formData=new FormData();
    formData.append('json',JSON.stringify(data));
    const token=await user.getIdToken();
    return fetch(`${LARAVEL_API_URL}/seller/register?api_token=${token}`,{
        method:'POST',
        body:formData
    }).then(res=>res.json());
}
/**
 * login details of user
 * @param {*} user firebase auth obj
 */
export const loginSellerAPI=async(user)=>{
    const token=await user.getIdToken();
    return fetch(`${LARAVEL_API_URL}/seller/login?api_token=${token}`)
    .then(res=>res.json());
}
/**
 * get seller items 
 * @param {*} user object
 */
export const getSellerItemsAPI=async(user)=>{
    const token=await user.getIdToken();
    return fetch(`${LARAVEL_API_URL}/seller/getItems?api_token=${token}`)
    .then(res=>res.json());
}

export const addItemAPI=async(user,data)=>{
    const formData=new FormData();
    console.log(data)
    formData.append('json',JSON.stringify(data));
    const token=await user.getIdToken();
    return fetch(`${LARAVEL_API_URL}/seller/addItem?api_token=${token}`,{
        method:'POST',
        mode:'cors',
        body:formData
    })
    .then(res=>res.json());
}
/**
 * get catagories from API.
 */
export const getCatagoryAPI=()=>{
return fetch(`${LARAVEL_API_URL}/getCatagory`)
.then(res=>res.json())
}

export const updateItemAPI=async(user,itemId,cellName,cellValue)=>{
    const token=await user.getIdToken();
    const data=new FormData();
    data.append('json',JSON.stringify({[cellName]:cellValue}));
return fetch(`${LARAVEL_API_URL}/seller/updateItem/${itemId}?api_token=${token}`,{
    method:'post',
    body:data
})
.then(data=>data.json())
}

export const deleteItemAPI=async(user,ids)=>{
    console.log('deleting',user)
    const token=await user.getIdToken();
    console.log(token);
    return fetch(`${LARAVEL_API_URL}/seller/deleteItems?ids=${ids}&api_token=${token}`) 
    .then(res=>res.json())
}