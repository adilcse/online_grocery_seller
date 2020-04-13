import { updateItemAPI } from "./laravelAPI";

const updateItemById=(user,itemId,cellName,cellValue)=>{
return updateItemAPI(user,itemId,cellName,cellValue)
.then((res)=>{
    console.log('not error',res)
    if(!res.error && res.status===1)
        return true;
    else
        throw res.error;
}).catch(()=>{
    console.log('catching');
    return false;
})
}
export default updateItemById;