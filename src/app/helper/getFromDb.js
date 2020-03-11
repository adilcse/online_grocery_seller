/**
 * takes a firebase query and return a promise with requested data
 * @param {*} query Firebase query
 */
export const getFromDb=(query)=>{
    return query.get()
    .then(function(querySnapshot) {
        var items=[];
        querySnapshot.forEach(function(doc) {
            items.push(doc.data());
        });
        console.log(query,items);
        return items;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        return false;
    });  
}