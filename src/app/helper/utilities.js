/**
 * Calcualte total price of items
 * @param {*} item ITEM
 */
export const orderTotal=(item)=>{
    let total=0;
   item.forEach(el=>{
        if(el.accept){
             total+= el.price*el.quantity;  
            }  
    });
    const deliveryCharges=0;
    return {
      subTotal:total,
      deliveryCharges:deliveryCharges,
      itemCounts:item.length,
      total:total+deliveryCharges
          };
}
/**
 * immutably add item at array index
 * @param {*} array array to be updated
 * @param {*} newItem new item at index
 * @param {*} atIndex index where item to be added
 */
export const updateArrayElement=(array, newItem, atIndex)=>{
    return array.map((item, index) => index === atIndex ? newItem : item);
}
/**
 * insert elenet at an index immutably
 * @param {*} arr array 
 * @param {*} index index to be added in array
 * @param {*} newItems item
 */
export const insertArrayElement = (arr, index,newItems) => 
      [ ...arr.slice(0, index),newItems, ...arr.slice(index)];