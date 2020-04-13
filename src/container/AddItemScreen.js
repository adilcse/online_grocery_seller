import React from 'react';
import { Container} from 'react-bootstrap';
import NewItem from '../components/addItem/NewItem';
import './AddItem.css';
import { useSelector } from 'react-redux';
const AddItemScreen=()=>{
  const user=useSelector(state=>state.userLogin.user);
return(
    <Container >
       <NewItem  user={user}/>
</Container>
)
}
export default AddItemScreen;