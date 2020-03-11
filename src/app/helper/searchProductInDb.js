
import algoliasearch from "algoliasearch";
import { ALGOLIA_INDEX_NAME } from "../AppConstant";

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID,process.env.REACT_APP_ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);
/**
 * in searches in algolia search index and gives result as an array
 * returns arrays of results
 * @param {*} value data to search in database
 */
export const searchProductInDb=(value)=>{
   return index.search(value,{
        attributesToRetrieve: ['name', 'price','image','id'],
        hitsPerPage: 10,
      }).then(({ hits }) => {
        return hits;
      }).catch(err=>{
          console.log(err);
          return false;
      });
}