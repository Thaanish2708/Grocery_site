import './LoginModal.css'; // Create a new CSS file for your custom styles

import LoginModal from './LoginModal';
import './LoginModal.css'; // Create a new CSS file for your custom styles
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function Header({data,  openModal, closeModal,isModalOpen, id, setId, Loggedin, setLoggedIn}) {
  const navigate = useNavigate();

  function showCart(){
    if(id==-1)
    {openModal();}
    else
    {
      navigate('/cart',{ state: data })
    }

  }


  

  return (
    
      <div class="row m-0 ">
        <div className='col-md-auto' style={{height:"15%",marginRight:"15px"}}>
          <img src="./logo.png" alt="logo" height="100vw" />
        </div>
        

        <form class="col-md-8 mt-auto mb-auto" role="search">
          <input type="search" class="form-control text" placeholder="Search..." aria-label="Search" width="100vw" />
        </form>
        

        <div  className="col-md-1 mt-auto mb-auto p-0" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <img src='cart.png' height="25vw" width="25vw" />
        {Loggedin && (<p style={{margin:"0px"}}>₹{data.totalValue}</p>)}
          <button type="button" class="btn" style={{width:"5vw", padding:"0px"}} onClick={showCart}>My Cart</button> 
        </div> 

        <div  className="col-md-auto mt-auto mb-auto" >
          <LoginModal  setId={setId} openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} Loggedin={Loggedin} setLoggedIn={setLoggedIn}/>
        </div>

      </div>
        
  );
}

export default Header;
