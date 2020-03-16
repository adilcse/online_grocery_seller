import React from 'react';
import { Container, Tabs,Tab} from 'react-bootstrap';
import ExistingItem from '../components/addItem/ExistingItem';
import NewItem from '../components/addItem/NewItem';
import './AddItem.css';
import { useSelector } from 'react-redux';
const AddItemScreen=()=>{
  const sellerId=useSelector(state=>state.userLogin.userId);
return(
    <Container >
    <Tabs defaultActiveKey="newItem" id="addItemTab">
  <Tab eventKey="newItem" title="Existing Item">
    <ExistingItem sellerId={sellerId}/>
    
  </Tab>
  <Tab eventKey="existingItem" title="New Item">
    <NewItem sellerId={sellerId}/>
 
  </Tab>
 
</Tabs>
</Container>
)
}
export default AddItemScreen;