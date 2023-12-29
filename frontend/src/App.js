import { useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./Components/Alert/Alert"
import Chat from './Pages/Chat';

function App() {
  const [alert,setalert]= useState()

  const showalert = (typ,message)=>{
setalert({
  type:typ,
  message:message
})
setTimeout(() => {
  setalert(null)
}, 2000);
  }
  return (
    <Router>
      <Alert alert={alert}/>
      <Routes>
      <Route path='/' element={<Home showalert = {showalert}/>}></Route>
      <Route path='/chat' element={<Chat showalert = {showalert}/>}></Route>

      </Routes>
    </Router>

  );
}

export default App;
