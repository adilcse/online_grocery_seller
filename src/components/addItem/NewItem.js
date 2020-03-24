import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import FileDrop from 'react-file-drop';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { getCatagories } from '../../app/helper/getCatagories';
import { uploadNewItem } from '../../app/helper/uploadNewItem';
let imgFile=null;
let allCatagory=[];
const NewItem=(props)=>{
  const [name,setName]=useState('');;
  const [catagory,setCatagory]=useState([]);
  const [price,setPrice]=useState('');
  const [discount,setDiscount]=useState('');
  const [stock,setStock]=useState(''); 
  const [description,setDescription]=useState(''); 
  const [imageSet,setImageSet]=useState(false);
  const [loadCatagory,SetLoadCatagory]=useState(false);
  const [showError,setShowError]=useState(false);
  const [successMessage,showSuccessMessage]=useState(false);
  if(!loadCatagory){
    getCatagories().then(res=>{
      console.log(res);
      allCatagory=res;
     
    }
    ).then(()=>SetLoadCatagory(true))
  }

  const imageBox={
    border: '8px solid',
    maxWidth:'200px',
    height:'300px',
    backgroundColor:'#F5F5F5',
    borderColor:'#D3D3D3',
    borderRadius:'10px',
    overflow:'hidden'
  }
 const handleDrop = (files, event) => {
   console.log(files);
   imgFile=files[0];
    setImageSet(URL.createObjectURL(files[0]));
  } 
  const handleUploadClick=(event)=>{
    console.log(event.target.files);
    imgFile=event.target.files[0]?event.target.files[0]:null;
    setImageSet(URL.createObjectURL(imgFile));
  }
const selectImage=()=>{
  document.getElementById('upload').click();
}
 const clear=()=>{
    setName('');
    setCatagory([]);
    setPrice('');
    setDiscount('');
    setStock('');
    setImageSet(false);
    setDescription('');
 }
 const handleSubmit=()=>{
  console.log(catagory);
  console.log(allCatagory);
  showSuccessMessage(false);
  if(name.length>3 && !isNaN(price) && !isNaN(discount) && !isNaN(stock) && catagory.length>0 && imgFile&&( imgFile.type==='image/jpeg'|| imgFile.type==='image/png')){
    setShowError(false);
    let cat=[];
    catagory.forEach(item=>{
      cat.push(allCatagory.find((element)=>{
        return element.name===item.name;
      }).catId)
    }); 
    let data={
      sellerId:props.sellerId,
      name:name,
      price:parseInt(price),
      discount:parseInt(discount),
      stock:parseInt(stock),
      catagory:cat,
      image:imgFile,
      description:description
    }
    console.log(data);
    uploadNewItem(data).then(res=>{
      if(res){
        clear();
        showSuccessMessage(true)
      }
    });
  }else{
    setShowError(true)
  }
}
return (
    <Form>
      {showError?
      <Alert variant='danger'>
        Please Enter correct data
      </Alert>:<></>}
      {successMessage?
      <Alert variant='success'>
        Data added Successfully
      </Alert>:<></>}
   <Form.Row>
        <Form.Group as={Col} controlId="name">
        <Form.Label>Product Name</Form.Label>
        <Form.Control value={name} 
                      onChange={(p)=>{setName(p.target.value)}} 
                      placeholder='Name'/>
        </Form.Group>

        <Form.Group as={Col} controlId="catagory">
        <Form.Label>Catagory</Form.Label>
        
        <Typeahead
        id="catagorySelected"
        labelKey="name"
        multiple={true}
        onChange={setCatagory}
        options={allCatagory}
        placeholder="Select a catagory.."
        selected={catagory}
      />
        </Form.Group>
    </Form.Row>
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
      <Col md='4' sm='12' className='text-center'>
      <div style={imageBox}  onClick={selectImage}>
      <input type='file' id='upload' onChange={handleUploadClick} style={{display:'none'}}/>
      <FileDrop onDrop={handleDrop}>
        {
        imageSet?<img src={imageSet} alt='uploaded pic' width='200px' height='300px'/>:<>Drop image files here!</>
      }
      </FileDrop>
      </div>
      </Col>
      <Col md='8' sm='12'>
      <Form.Group controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows="3"  onChange={(s)=>setDescription(s.target.value)}  value={description} />
    </Form.Group>
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
export default NewItem;