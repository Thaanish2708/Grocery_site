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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [id,setId] = useState(-1)
  const [Loggedin,setLoggedIn] = useState(false)
  const [cartData, setCartData] = useState({});

  const handleAddToCart = (data) => {
    // Handle the data received from the Card component, e.g., add it to the cart
    setCartData(data);
    
  };
  return(
    <Router>
    <Header data={cartData}  openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} id={id} setId={setId} Loggedin={Loggedin} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home openModal={openModal} handleAddToCart={handleAddToCart} closeModal={closeModal} isModalOpen={isModalOpen} id={id} setId={setId} Loggedin={Loggedin} setLoggedIn={setLoggedIn}/>} />
        <Route path="/cart" element={<Cart openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} id={id} setId={setId} Loggedin={Loggedin} setLoggedIn={setLoggedIn}/>} />

      </Routes>
    </Router>
  )
}

export default App;