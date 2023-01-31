
import './App.css';

import {

  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";


import Signup from './Signup';
import { Login  } from './Login';
import SettingPage from './SettingPage';
import ViewProfile from './ViewProfile';


function App() {

// const logout =()=>{
//   localStorage.removeItem("token");
//   window.location.replace('/')
// }
  return (
    <>
 

<div class="navbar">
 
  
  <a  href="/signup" class="right">Signup</a>
  <a  href="/login" class="right">login</a>
  <a href ="/settingPage" class ="right">SettingPage</a>
  <a href ="/ViewProfile" class ="right">ViewProfile</a>
</div>
   
      <BrowserRouter>
      <Routes>
       
        <Route path="/signup" element={<Signup />}> </Route>

        <Route path="/login" element={<Login />}> </Route>
        <Route path ='/settingPage' element = {<SettingPage/>} ></Route>
        <Route path ='/ViewProfile' element = {<ViewProfile/>} ></Route>


      </Routes>
    </BrowserRouter>
  
    </>
    
  );
  
}

export default App;


