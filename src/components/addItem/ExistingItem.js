import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Search } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { searchProductInDb } from '../../app/helper/searchProductInDb';
import { getItemFromDb } from '../../app/helper/getItemFromDb';
import { addInExistingItem } from '../../app/helper/addInExistingItem';


const error={
    productId:true,
    productName:true,
}
const touched={
    productId:false,
    productName:false,
}
const ExistingItem=(props)=>{
    const [changed,setChanged]=useState(false);
    const[idEnabled,setIdEnabled]=useState(true);
    const[productId,setProductId]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const [searchResults,setSearchResults]=useState([]);
    const [searchValue,setSearchValue]=useState('');
    const [price,setPrice]=useState('');
    const [discount,setDiscount]=useState('');
    const [stock,setStock]=useState('');
    const [errorMessage,showErrorMessage]=useState(false);
    const [successMessage,showSuccessMessage]=useState(false);
    /**
     * handles type in id
     * @param {*} element input container
     */
    const handleSubmit=()=>{
       showSuccessMessage(false);
        if(productId && !isNaN(price) && !isNaN(discount) && !isNaN(stock)){
            showErrorMessage(false);
            let data={
                sellerId:props.sellerId,
                productId:productId,
                name:searchValue,
                price:parseInt(price),
                stock:parseInt(stock),
                discount:parseInt(discount)
            }
            addInExistingItem(data).then(res=>{
                if(res){
                    clear();
                    showSuccessMessage(true);
                }else{
                    showErrorMessage(true);
                }
            });
        }
        else{
            showErrorMessage(true);
        }
    }
const handleIdChange=(element)=>{
 const val=element.target.value;
 const id=element.target.id;
 setProductId(val);
    touched[id]=true;
    if(val.length===20){
        getItem(val);
    }else{
        error[id]=true;
    }
         
    setChanged(!changed)
}
/**
 * gets item  from database with given id
 * @param {*} id id to get item 
 */
    const getItem=(id)=>{
        console.log(id);
        getItemFromDb(id).then(res=>{
            if(res){
                console.log(res)
                error.productId=false;
                setSearchValue(res.name);
                
            }else{
                error.productId=true;
            }
        })
    }
    /**
     * search for name in database
     * @param {*} element 
     * @param {*} data data of item to search
     */
    const handleSearchChange=(element,data)=>{
        setIsLoading(true);
        setSearchValue(data.value);
        searchProductInDb(data.value).then(res=>{
            if(res){
               let result=[];
               res.forEach(item=>{
                   result.push({
                       id:item.id,
                       title:item.name,
                       image:item.image,

                   })
               });
            setSearchResults(result);
          
            }
            setIsLoading(false);
        })
    }
    /**
     * when an item is selected it changes the fields
     * @param {*} element 
     * @param {*} data data if selected item
     */
    const handleResultSelect=(element,data)=>{
       setProductId(data.result.id);
       setIdEnabled(false);
       error.productId=false;
       touched.productId=true;
       setSearchValue(data.result.title);
      
       
    }
    /**
     * clear fields in the form
     */
    const clear=()=>{
        error.productId=true
        error.productName=true
        touched.productId=false
        touched.productName=false
        setChanged(false);
        setIdEnabled(true);
        setProductId('');
        setSearchValue('');
        setSearchResults([]);
        setPrice('');
        setDiscount('');
        setStock('');
    }
return (

    <Form>
         {errorMessage?
      <Alert variant='danger'>
        Please Enter correct data
      </Alert>:<></>}
      {successMessage?
      <Alert variant='success'>
        Data added Successfully
      </Alert>:<></>}
        <Row >
     <Col md='6' className='m-auto'>
    <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Search
                size='large'
                aligned='right'
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={handleSearchChange}
                results={searchResults}
                value={searchValue}
                />  
            </Form.Group>
   

        <Form.Group controlId="productId">
            <Form.Label>Product ID</Form.Label>
            <Form.Control   type="text" 
                            placeholder="Product ID" 
                            onChange={handleIdChange} 
                            isInvalid={error.productId && touched.productId}
                            isValid={!error.productId && touched.productId}
                            maxLength={20}
                            disabled={!idEnabled}
                            value={productId}
                            />
            <Form.Control.Feedback type="invalid">Please Enter correct Id</Form.Control.Feedback>
        </Form.Group>
    <Form.Row>
        <Form.Group as={Col} controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control value={price} onChange={(p)=>{setPrice(p.target.value)}} />
        </Form.Group>

        <Form.Group as={Col} controlId="discount">
        <Form.Label>Discount in %</Form.Label>
        <Form.Control value={discount} onChange={(d)=>setDiscount(d.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="stock">
        <Form.Label>Current Stock</Form.Label>
        <Form.Control value={stock} onChange={(s)=>setStock(s.target.value)}/>
        </Form.Group>
    </Form.Row>
    <Row>
        <Col >
        <Button variant="primary"  size='lg' block onClick={handleSubmit}>
            Save
        </Button>
        </Col>
    <Col >
    <Button variant="warning"  size='lg' block onClick={clear}>
        Clear
    </Button>
    </Col>
    </Row>
    
  
    </Col>
 
  </Row>
</Form>
)
}
export default ExistingItem;