import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useLocation } from 'react-router-dom';
function Search({openModal, handleAddToCart, closeModal, isModalOpen, id, setId, Loggedin, setLoggedIn})
{
  const location = useLocation();
  const data = location.state
    return (
      <>
      <div className="App container-fluid" style={{ marginBottom: "200px", display:'flex', flexDirection:'row',flexWrap:'wrap'}}>
      
      <hr style={{ marginTop: "-5px" }} />
      {data.map((product,index)=>
      {
        return <Card openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} product={product}  id={id} setId={setId} onAddToCart={handleAddToCart} />

      })}
      </div>
      </>
    )
}

export default Search