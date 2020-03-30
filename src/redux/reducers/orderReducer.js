import { GET_ORDER_SUCCESS, GET_ORDER_PENDING, GET_ORDER_FAILED, CHANGE_DETAILS } from "../../app/ActionConstant";
import { orderTotal, insertArrayElement, updateArrayElement } from "../../app/helper/utilities";

const initialState={
    loading:false,
    loaded:false,
    orders:[],
    error:false,
    details:{}
}
export const getOrders=(state=initialState,action={})=>{
switch(action.type){
    case GET_ORDER_PENDING:
        return{...state,loading:true,loaded:false}
    case GET_ORDER_SUCCESS:
        {
            const snapshot=action.payload;
            let order=[...state.orders];
            let details={...state.details}
            snapshot.forEach(element => {
                const data={...element.doc.data(),id:element.doc.id,total:orderTotal(element.doc.data().items)};
                  if(element.type==='added'){
                   order=insertArrayElement(order,element.newIndex,data);
                  }else if(element.type==='modified'){
                   details={...details,status:data.status};
                   order=updateArrayElement(order,data,element.oldIndex);
                  }else if(element.type==='removed'){
                  order=state.orders.filter((_, i) => i !== element.oldIndex);
                  }
              });
              return{...state,orders:order,loaded:true,loading:false,details:details}
        }
        case GET_ORDER_FAILED:
            return{...state,loading:false,loaded:true,error:action.payload}
        case CHANGE_DETAILS:
            return{...state,details:action.payload}
    default:
        return state;
}
}