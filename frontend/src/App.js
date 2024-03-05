import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Main from "./Components/Home/Main";
import PropertyList from "./Components/Home/PropertyList";

function  App() {
  //manageing the routing configuration for the application
  const router = createBrowserRouter(
    //it follow the path in url
    createRoutesFromElements(
      //define all match components like '/'
      <Route path="/" element={<Main />} id="main" exact>
<Route id="home" index element={<PropertyList />}exact/>
</Route>
    )
  );
  return <div className="App">
    {/*This ensure that the routering is avalible through application*/}
    <RouterProvider router={router}/>
  </div>;
}
export default App;