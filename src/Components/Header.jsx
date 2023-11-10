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
  const [search1,setSearch] = useState('')
  const handleSearchChange = async(e) => {
    setSearch(e.target.value);
    if(e.target.value===''){
      navigate('/')
    }
    else{const response = await fetch(`http://localhost:8080/products/search?query=${e.target.value}`, {
          method: "GET",
        });
  
        if (response.status === 200) {
          
            const data3 =  await response.json();
            // console.log(data3);
            navigate('/search',{state:data3})
  }};}
  const isPlaceOrderRoute = () => {
    return window.location.pathname === '/placeOrder';
  };

  // Conditionally render the header based on the route
  if (isPlaceOrderRoute()) {
    // Do not render the header for "placeOrder" route
    return null;
  }
  
  
  return (
    <div className='container-fluid'>
      <div className="row m-0 ">
        <div className='col-md-auto' onClick={()=> {navigate('/');setSearch('')}} style={{height:"15%",marginRight:"15px"}}>
          <img src="./logo.png" alt="logo" height="100vw" />
        </div>
        

        <form class="col-md-8 mt-auto mb-auto" style={{marginRight:"2%"}} role="search">
          <input type="search" value = {search1} class="form-control text" placeholder="Search..." aria-label="Search" width="100vw" onChange={handleSearchChange}/>
        </form>
        

        <div  className="col-md-1 mt-auto mb-auto p-0" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <img src='cart.png' height="25vw" width="25vw" />
        {Loggedin && (<p style={{margin:"0px"}}>₹{data.totalValue}</p>)}
          <button type="button" class="btn" style={{width:"5vw", padding:"0px"}} onClick={showCart}>My Cart</button> 
        </div> 

        <div  className="col-md-auto mt-auto mb-auto" >
          <LoginModal setId={setId} openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} Loggedin={Loggedin} setLoggedIn={setLoggedIn} id={id}/>
        </div>
       


      </div>
      <hr style={{ marginTop: "0px" }} />
      </div>
        
  );
}

export default Header;
