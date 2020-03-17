import React, { useState } from 'react';
import { Row, Container, Alert } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import updateItemById from '../app/helper/updateItemById';
import getSellerItems from '../app/helper/getSellerItems';
const HomeScreen = ()=>{
const [products,setProducts]=useState([]);
const [itemsLoaded,setItemsLoaded]=useState(false);
const sellerId=useSelector(state=>state.userLogin.userId);
const [showError,setShowError]=useState(false);
const [showSuccess,setShowSuccess]=useState(false);
if(!itemsLoaded){
getSellerItems(sellerId).then(res=>{
  console.log(res)
  if(res)
    setProducts(res);
  else
    setShowError(true);
  setItemsLoaded(true);
})
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
      const onAfterSaveCell=(row, cellName, cellValue)=> {
      updateItemById(row.id,cellName,cellValue).then(res=>{
        if(res){
          setShowSuccess(true);
          setShowError(false)
        }
         else{
           setShowError(true)
         setShowSuccess(false) }
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
            if(!isNaN(cellValue) && parseInt(cellValue)>0)
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
return(
    <Container>
        <Row>
        <h2>
            Items in My Store:
        </h2>
        </Row>
        <Row>
       {showError?<Alert variant='danger'>
         Error getting data
       </Alert>:<></>}
       {showSuccess?<Alert variant='success'>
         updated successfully
       </Alert>:<></>}
  </Row>
  <BootstrapTable data={products}  pagination  options={{sortIndicator:true}} cellEdit={ cellEditProp }>
        <TableHeaderColumn isKey dataField='id' dataSort={ true }  caretRender={ getCaret } editable={false}>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort  caretRender={ getCaret }>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='price' dataSort  caretRender={ getCaret }>MRP</TableHeaderColumn>
        <TableHeaderColumn dataField='discount' dataSort  caretRender={ getCaret } >Discount %</TableHeaderColumn>
        <TableHeaderColumn dataField='stock' dataSort  caretRender={ getCaret }>Current Stock</TableHeaderColumn>
  </BootstrapTable>
    </Container>
)
}
export default HomeScreen;