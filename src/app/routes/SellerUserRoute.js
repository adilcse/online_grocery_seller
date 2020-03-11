import React, { lazy, Suspense } from "react";
import Loading from "../../components/Loading";
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import { useDispatch } from "react-redux";
import { Logout as LogoutAction} from "../../redux/actions/UserAction";
import SellerNav from "../../section/header/Nav";
import AddItemScreen from "../../container/AddItemScreen";

const Home = lazy(() => import('../../container/HomeScreen'));

const SellerUserRoute=()=>{

  
return(

      <div className="App text-center">
        <SellerNav/>
          <Switch>
            <Suspense fallback={<Loading size={100}/>}>
                <Route path='/Home' component={Home} />
                <Route path='/additem' component={AddItemScreen}/>
                <Route path='/' exact={true} component={Home}/>
               
            </Suspense>
        </Switch>  
      </div>
 
)
}
export default SellerUserRoute;