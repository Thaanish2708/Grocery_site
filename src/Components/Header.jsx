import './LoginModal.css'; // Create a new CSS file for your custom styles

import LoginModal from './LoginModal';
import './LoginModal.css'; // Create a new CSS file for your custom styles
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function Header({data}) {

  const navigate = useNavigate();

  function showCart(){
    navigate('/cart',{ state: data })

  }

  const [id,setId] = useState(0)

console.log("Id",id);
  

  return (
    
      <div class="row m-0 ">
        <div className='col-md-auto' style={{height:"15%",marginRight:"15px"}}>
          <img src="./logo.png" alt="logo" height="100vw" />
        </div>
        

        <form class="col-md-8 mt-auto mb-auto" role="search">
          <input type="search" class="form-control text" placeholder="Search..." aria-label="Search" width="100vw" />
        </form>
        

        <div  className="col-md-1 mt-auto mb-auto p-0">
          <img src='cart.png' height="25vw" width="25vw" />
          <p style={{margin:"0px"}}>₹{data.totalValue}</p>
          <button type="button" class="btn" style={{width:"5vw", padding:"0px"}} onClick={showCart}>My Cart</button> 
        </div> 

        <div  className="col-md-auto mt-auto mb-auto" >
          <LoginModal  setId={setId}/>
        </div>

      </div>
        
  );
}

export default Header;
