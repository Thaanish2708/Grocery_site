import './App.css';
import Header from './Components/Header';
import Banner from './Components/Banner';
import Category from './Components/Category';
import ProdList from './Components/ProdList';
import React, { useState, useEffect } from 'react';
import Home from './Components/Home';
import Cart from './Components/Cart'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {


  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </Router>
  )
}

export default App;