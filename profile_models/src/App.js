
import './App.css';

import {

  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";


import Signup from './Signup';
import { Login  } from './Login';


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
</div>
   
      <BrowserRouter>
      <Routes>
       
        <Route path="/signup" element={<Signup />}> </Route>

        <Route path="/login" element={<Login />}> </Route>


      </Routes>
    </BrowserRouter>
  
    </>
    
  );
  
}

export default App;


