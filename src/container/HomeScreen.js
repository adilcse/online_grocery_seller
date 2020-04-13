import React, { useState } from 'react';
import { Row, Container, Alert, Button } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import updateItemById from '../app/helper/updateItemById';
import { deleteSellerItems } from '../app/helper/deleteSellerItems';
import { getSellerItemAction } from '../redux/actions/productAction';
import Loading from '../components/Loading';
const HomeScreen = ()=>{
const user=useSelector(state=>state.userLogin.user);
const [showError,setShowError]=useState(false);
const [showSuccess,setShowSuccess]=useState(false);
const allProducts=useSelector(state=>state.productReducer);
const dispatch=useDispatch();
if(!allProducts.loaded && !allProducts.loading){
getSellerItemAction(dispatch,user);
}
const deleteItem=(ids,items)=>{

  deleteSellerItems(user,ids,items)
   
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
      const onBeforeSaveCell=async(row, cellName, cellValue)=> {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        const status=()=>{
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
      if(status()){
       const res= await updateItemById(user,row.id,cellName,cellValue)
        .then(res=>{
          if(res){
            setShowSuccess(true);
            setShowError(false);
            return true;
          }

           else{
             setShowError(true)
           setShowSuccess(false) 
          return false;}
        });
        if(res)
          return true;
        else
          return false;
      }else{
        return false;
      }
    }
      const cellEditProp = {
        mode: 'dbclick',
        blurToSave: true,
        beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
    
      };
      if(allProducts.loading)
        return(<Loading size={100}/>);
     else if(allProducts.loaded && !allProducts.loading)
return(
    <Container>
      <Row>
        <Button onClick={()=>getSellerItemAction(dispatch,user)} variant='warning'>Refresh</Button>
      </Row>
        <Row>

        <h2>
            Items in My Store:
        </h2>

        </Row>
        <Row>
       {showError?<Alert variant='danger'>
         something went wrong...
       </Alert>:<></>}
       {showSuccess?<Alert variant='success'>
         updated successfully
       </Alert>:<></>}
  </Row>
  <Row className='text-left'>
  <BootstrapTable data={allProducts.products}  
                  pagination 
                  deleteRow={true} 
                  selectRow={{mode:'checkbox',bgColor:'red'}}  
                  options={{sortIndicator:true,afterDeleteRow:deleteItem}} 
                  search={ true } 
                  multiColumnSearch={ true }
                  cellEdit={ cellEditProp }>
        <TableHeaderColumn isKey dataField='id' dataSort={ true } hidden  caretRender={ getCaret } editable={false}>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort  caretRender={ getCaret }>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='price' dataSort  caretRender={ getCaret }>MRP</TableHeaderColumn>
        <TableHeaderColumn dataField='discount' dataSort  caretRender={ getCaret } >Discount %</TableHeaderColumn>
        <TableHeaderColumn dataField='stock' dataSort  caretRender={ getCaret }>Current Stock</TableHeaderColumn>
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