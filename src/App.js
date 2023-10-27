import './App.css';
import Header from './Components/Header';
import Banner from './Components/Banner';
import Category from './Components/Category';
import ProdList from './Components/ProdList';
import React, { useState, useEffect } from 'react';

function App() {
  const [productData, setProductData] = useState({});
  const [cartData, setCartData] = useState({});

  const handleAddToCart = (data) => {
    // Handle the data received from the Card component, e.g., add it to the cart
    setCartData(data);
    
  };
  console.log("CART DATA",cartData);
  const categories = ["cat1", "cat2"]; // Add all your categories here
  const products = [{
    "id":1,
    "name":"Ornage",
    "size":"200g",
    "pirce":"110"},
    {
      "id":2,
      "name":"Apple",
      "size":"200g",
      "pirce":"110"},
    {
      "id":3,
      "name":"Banana",
      "size":"200g",
      "pirce":"110"},
    {
      "id":4,
      "name":"Kiwi",
      "size":"200g",
      "pirce":"110"},
    {
      "id":5,
      "name":"Carrot",
      "size":"200g",
      "pirce":"110"},
  ]


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
      if(category=="cat1"){
        return products
      }
      
      const response = fetch("", {
        method: "GET",
      });

      if (response.status === 200) {
          const data =  response.json();
          console.log("Products", data);
          return data;
        // Reset the form or perform any other actions as needed
      } else {
          console.log(response);
          console.log(response.status);
        console.error("Failed to add employee.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App container-fluid" style={{ marginBottom: "200px" }}>
      <Header />
      <hr style={{ marginTop: "-5px" }} />
      <div style={{ padding: "0px 110px" }}>
        <Banner />
        <div className='row catlist'>
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        </div>
        {categories.map((category, index) => (
          <ProdList key={index} categoryName={category} onAddToCart={handleAddToCart} productList={productData[category] || []} />
        ))}
        </div>
      </div>
    
  );
}

export default App;
