import './App.css';
import Header from './Components/Header';
import Banner from './Components/Banner';
import Category from './Components/Category';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Components/Card';
import './Components/Card.css';
import React, { useState, useRef } from 'react'; // Import useState and useRef
 
function App() {
  const [productData, setProductData] = useState({});
  const categories = [1, 2]; // Add all your categories here

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
      
      const response = await fetch(`http://localhost:8080/category/${category}`, {
        method: "GET",
      });

      if (response.status === 200) {
          const data = await response.json();
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
<div className="App">
<Header />
<Banner />
<div className='row' style={{ marginLeft: "100px", marginRight: "100px" }}>
  <Category />
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
 
<div className='row' style={{ marginLeft: "130px", marginRight: "80px" }}>
<h4 className='col-md-1'>Hellooo</h4> {/* Custom "Next" button */}
</div>
<div className='custom-arrow-right'>
    <button onClick={nextSlide} style={{borderRadius:"50%",backgroundColor:"white",border: "4px solid transparent",boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px"}}>&gt;</button>
</div>
<div className='row' style={{ marginLeft: "130px", marginRight: "80px" }}>
<div>
<Slider {...settings} ref={sliderRef}>
            {cards.map((card, index) => (
<div key={index} className="card-container">
                {card}
</div>
            ))}
</Slider>
</div>
</div>
</div>
  );
}
 
export default App;