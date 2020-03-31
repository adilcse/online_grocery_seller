import React, { lazy, Suspense } from "react";
import Loading from "../../components/Loading";
import {
    Switch,
    Route
  } from "react-router-dom";
import SellerNav from "../../section/header/Nav";
const AddItemScreen=lazy(()=>import("../../container/AddItemScreen"));
const OrdersScreen=lazy(()=>import("../../container/OrdersScreen"));
const Home = lazy(()=>import('../../container/HomeScreen'));
const SellerUserRoute=()=>{
  document.title='welcome seller';
return(

      <div className="App text-center">
        <SellerNav/>
          <Switch>
            <Suspense fallback={<Loading size={100}/>}>
                <Route path='/Home' component={Home} />
                <Route path='/orders' component={OrdersScreen} />
                <Route path='/additem' component={AddItemScreen}/>
                <Route path='/' exact={true} component={Home}/>
               
            </Suspense>
        </Switch>  
      </div>
 
)
}
export default SellerUserRoute;