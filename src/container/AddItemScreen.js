import React from 'react';
import { Container, Tabs,Tab} from 'react-bootstrap';
import ExistingItem from '../components/addItem/ExistingItem';
import NewItem from '../components/addItem/NewItem';
import './AddItem.css';
const AddItemScreen=()=>{
return(
    <Container >
    <Tabs defaultActiveKey="newItem" id="addItemTab">
  <Tab eventKey="newItem" title="Existing Item">
    <ExistingItem/>
    
  </Tab>
  <Tab eventKey="existingItem" title="New Item">
    <NewItem/>
 
  </Tab>
 
</Tabs>
</Container>
)
}
export default AddItemScreen;