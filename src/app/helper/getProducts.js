/**
 * takes a firebase query and return a promise with requested data
 * @param {*} query Firebase query
 */
export const getproducts=(query)=>{
    return query.get()
    .then(function(querySnapshot) {
        var items=[];
        querySnapshot.forEach(function(doc) {
            items.push({...doc.data(),id:doc.id,MRP:doc.data().price,price:Math.floor(parseInt(doc.data().price)*(1-doc.data().discount/100))});
        });
        return items;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        return false;
    });  
}