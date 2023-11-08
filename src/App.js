import './App.css';
import Header from './Components/Header';
import React, { useState, useEffect } from 'react';
import Home from './Components/Home';
import Cart from './Components/Cart'
import Search from './Components/Search';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import CheckoutComp from './Components/CheckoutComp';
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

 

useEffect(() => {
  const storedUserAuth = localStorage.getItem('userAuth');

  if (storedUserAuth) {
    const userAuth = JSON.parse(storedUserAuth);
    // console.log(userAuth);
    const { userId, loggedIn, name } = userAuth;
    setId(userId);
    setLoggedIn(loggedIn);

  }
}, []);
  

  return(
    <Router>
    <Header data={cartData}  openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} id={id} setId={setId} Loggedin={Loggedin} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home openModal={openModal} handleAddToCart={handleAddToCart} closeModal={closeModal} isModalOpen={isModalOpen} id={id} setId={setId} Loggedin={Loggedin} setLoggedIn={setLoggedIn}/>} />
        <Route path="/cart" element={<Cart openModal={openModal} handleAddToCart={handleAddToCart} closeModal={closeModal} isModalOpen={isModalOpen} id={id} setId={setId} Loggedin={Loggedin} setLoggedIn={setLoggedIn} cartData={cartData}/>} />
        <Route path="/search" element={<Search openModal={openModal} handleAddToCart={handleAddToCart} closeModal={closeModal} isModalOpen={isModalOpen} id={id} setId={setId} Loggedin={Loggedin} setLoggedIn={setLoggedIn}/>} />
        <Route path="/placeOrder" element={<CheckoutComp openModal={openModal} cartData={cartData} closeModal={closeModal} isModalOpen={isModalOpen} id={id} setId={setId} Loggedin={Loggedin} setLoggedIn={setLoggedIn}/>} />
      </Routes>
    </Router>
  )
}

export default App;