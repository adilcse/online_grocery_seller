import React from 'react';
import { Container} from 'react-bootstrap';
import NewItem from '../components/addItem/NewItem';
import './AddItem.css';
import { useSelector } from 'react-redux';
const AddItemScreen=()=>{
  const sellerId=useSelector(state=>state.userLogin.userId);
return(
    <Container >
       <NewItem sellerId={sellerId}/>
</Container>
)
}
export default AddItemScreen;