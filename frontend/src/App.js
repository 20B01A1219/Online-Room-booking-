import './App.css';
import Navbar from './componenets/Navbar';
import {BrowserRouter, Route,Routes, Link} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import React,{useEffect} from 'react';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
          <Route path="/home" element ={<Homescreen/>}/>
          <Route path = '/book/:roomid/:fromdate/:todate' element = {<Bookingscreen/>}/>
          <Route path='/register' element = {<Registerscreen/>}/>
          <Route path = '/login' element = {<Loginscreen/>}/>
          <Route path = '/profile' element = {<Profilescreen/>}/>
          <Route path = '/admin' element = {<Adminscreen/>}/>
          <Route path = '/' element = {<Landingscreen/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
