import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Main from "./Components/Home/Main";
import PropertyList from "./Components/Home/PropertyList";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import Login from "./Components/User/Login";
import {Flip,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { currentUser } from "./Store/User/user-action";
import { userActions } from "./Store/User/user-slice";
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";

function  App() {
  const dispatch=useDispatch();
  const{errors} =useSelector((state)=>state.user);
  useEffect(()=>{
    if(errors)
    {
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  },[errors,dispatch]);


  //manageing the routing configuration for the application
  const router = createBrowserRouter(
    //it follow the path in url
    createRoutesFromElements(
      //define all match components like '/'
      <Route path="/" element={<Main />} id="main" exact>
<Route id="home" index element={<PropertyList />}exact/>
<Route element={<PropertyDetails/>} id="PropertyDetails" path="propertylist/:id" exact/>
<Route id="login" path="login" element={<Login />} />
<Route id="signup" path="signup" element={<Signup />} />
<Route id="profile" path="profile" element={<Profile />} />
<Route id="editprofile" path="editprofile" element={<EditProfile />} />
<Route id="updatepassword" path="user/updatepassword" element={<UpdatePassword />} />
<Route id="forgotpassword" path="user/forgotpassword" element={<ForgotPassword />} />
<Route id="resetpassword" path="user/resetpassword" element={<ResetPassword />} />
</Route>
    )
  );
  return (<div className="App">
    {/*This ensure that the routering is avalible through application*/}
    <RouterProvider router={router}/>

    <ToastContainer
    position="bottom-center"
      autoClose={3000}
      draggable={true}
      transition={Flip}
      />
  </div>
  );
}
export default App;