
import Header from './Header';
import Banner from './Banner';
import Category from './Category';
import ProdList from './ProdList';
import React, { useState, useEffect } from 'react';

function Home({openModal, handleAddToCart, closeModal, isModalOpen, id, setId, Loggedin, setLoggedIn}){
    const [productData, setProductData] = useState({});

  

  const categories = ["Vegetables", "Fruits"]; // Add all your categories here
  // const products = []


  useEffect(() => {
    // Fetch data for each category and store it in productData
    const fetchData = async () => {
      const data = {};
      for (const category of categories) {
        const productList = await getProductlist(category);
        data[category] = productList;
      }
      setProductData(data);
    };

    fetchData();
  }, []);

  const getProductlist = async (category) => {
    try {

      
      const response = await fetch(`http://localhost:8080/category/name/${category}`, {
        method: "GET",
      });

      if (response.status === 200) {
          const data =  await response.json();
          
          return data;
        // Reset the form or perform any other actions as needed
      } else {
          
        console.error("Failed to add employee.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App container-fluid" style={{ marginBottom: "200px" }}>
      <div style={{ padding: "0px 110px" }}>
        <Banner />
        <div className='row catlist'>
        <Category name={"Vegetables"} />
        <Category name={"Fruits"} />
        <Category name={"Vegetables"} />
        <Category name={"Vegetables"} />
        <Category name={"Vegetables"} />
        </div>
        {categories.map((category, index) => (
          <ProdList key={index} openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} categoryName={category} onAddToCart={handleAddToCart} id={id} setId={setId} productList={productData[category] || []} />
        ))}
        </div>
        
      </div>
      
    
  );
}

export default Home;