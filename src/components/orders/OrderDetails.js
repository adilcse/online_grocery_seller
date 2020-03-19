import React from 'react';
import { ORDER } from '../../app/AppConstant';
const OrderDetails=(props)=>{
    const{details}=props;
    console.log(details)
return(
    <div>
        <button onClick={()=>props.changePage(ORDER)}>Back</button>
    </div>
)
}
export default OrderDetails;