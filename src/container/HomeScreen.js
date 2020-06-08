import React, { useState } from 'react';
import { Row, Container, Alert } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import updateItemById from '../app/helper/updateItemById';
import { deleteSellerItems } from '../app/helper/deleteSellerItems';
import { getSellerItemAction } from '../redux/actions/productAction';
import Loading from '../components/Loading';
const HomeScreen = ()=>{
const sellerId=useSelector(state=>state.userLogin.userId);
const [showError,setShowError]=useState(false);
const [showSuccess,setShowSuccess]=useState(false);
const allProducts=useSelector(state=>state.productReducer);
const dispatch=useDispatch();
if(!allProducts.loaded && !allProducts.loading){
    getSellerItemAction(dispatch,sellerId);
  }
const deleteItem=(items)=>{
  deleteSellerItems(sellerId,items).then(()=>{
    showSuccess(true);
  });
}
    const getCaret=(direction)=> {
        if (direction === 'asc') {
          return (
          <IoIosArrowUp/>
          );
        }
        if (direction === 'desc') {
          return (
            <IoIosArrowDown/>
          );
        }
        return (
            <IoIosArrowUp/>
        );
      }
      const options = {
        page: 1,  // which page you want to show as default
        sizePerPageList: [ {
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'All', value: allProducts.products.length
        } ], // you can change the dropdown list for size per page
        sizePerPage: 5,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 3,  // the pagination bar size.
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        paginationPosition: 'top',  // default is bottom, top and both is all available
        sortIndicator:true,
        afterDeleteRow:deleteItem,
        deleteText: 'Delete items',
      };

      const onAfterSaveCell=(row, cellName, cellValue)=> {
      row.sellingPrice = Math.floor(parseInt(row.price)*(1-row.discount/100));         
      updateItemById(row.id,cellName,cellValue).then(res=>{
        if(res){
          setShowSuccess(true);
          setShowError(false)
        }
        else{
          setShowError(true)
          setShowSuccess(false) 
        }
      });
      }
      
      const onBeforeSaveCell=(row, cellName, cellValue)=> {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        switch(cellName){
          case 'price':
            if(!isNaN(cellValue) && parseInt(cellValue)>0)
              return true;
            break;
          case 'name':
            if(cellValue.length>3)
              return true;
            break;
          case 'stock':
            if(!isNaN(cellValue) && parseInt(cellValue)>0)
            return true;
          break;
          case 'discount':
            if(!isNaN(cellValue) && parseInt(cellValue)>0 && parseInt(cellValue) < 100)
            return true;
          break;
          default:
            return false;
        }
        return false;
      }
      const cellEditProp = {
        mode: 'dbclick',
        blurToSave: true,
        beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
        afterSaveCell: onAfterSaveCell  // a hook for after saving cell
      };
      const priceFormatter=(cell,row,type='none')=>{
        switch(type){
          case 'mrp':
            return `₹ ${cell}`;
          case 'discount':
            return `${cell} %`;
          case 'price':
            return `₹ ${cell}`;
          case 'stock':
            return (parseInt(cell)<=5)? `<div class="text-danger"> ${cell} </div> (out of stock soon)`: cell;
          default:
            return cell;
        }
      }

      if(allProducts.loading)
        return(<Loading size={100}/>);
     else if(allProducts.loaded && !allProducts.loading)
return(
    <Container>
        <Row>
        <h2>
            Items in My Store:
        </h2>
        </Row>
        <Row>
       {showError?<Alert variant='danger' dismissible onClose={()=>setShowError(false)}>
         Error getting data
       </Alert>:<></>}
       {showSuccess?<Alert variant='success' dismissible onClose={()=>setShowSuccess(false)}>
         updated successfully
       </Alert>:<></>}
  </Row>
  <Row className='text-left mb-5'>
  <BootstrapTable data={allProducts.products}  pagination deleteRow={true} selectRow={{mode:'checkbox'}}  options={options} cellEdit={ cellEditProp }>
        <TableHeaderColumn isKey dataField='id' dataSort={ true } hidden  caretRender={ getCaret } editable={false}>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort  caretRender={ getCaret } filter={ { type: 'TextFilter' } } width='320'>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='price' dataSort  dataFormat={ priceFormatter } formatExtraData={ 'mrp' }  caretRender={ getCaret }>MRP</TableHeaderColumn>
        <TableHeaderColumn dataField='discount' dataSort dataFormat={ priceFormatter } formatExtraData={ 'discount' }  caretRender={ getCaret } >Discount %</TableHeaderColumn>
        <TableHeaderColumn dataField='sellingPrice' dataSort dataFormat={ priceFormatter } formatExtraData={ 'price' }  caretRender={ getCaret } editable={false}>Selling price</TableHeaderColumn>
        <TableHeaderColumn dataField='stock' dataSort dataFormat={ priceFormatter } formatExtraData={ 'stock' }  caretRender={ getCaret }>Current Stock</TableHeaderColumn>
  </BootstrapTable>
  </Row>
    </Container>
)
else{
  return(
    <Loading size={100}/>
  )
}
}
export default HomeScreen;