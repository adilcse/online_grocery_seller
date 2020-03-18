/**
 * merge arrays and return a single array
 * @param {*} array1 1st array
 * @param {*} array2 second array
 * @param {*} prop property to be merged by
 */
export const arrayMergeByObject=(array1, array2, prop)=> {
    return array2.map(function (item2) {
        var item1 = array1.find(function (item1) {

            return item1[prop] === item2[prop];
        });
        return Object.assign({}, item1, item2);
    });
}