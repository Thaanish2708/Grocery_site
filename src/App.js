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
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 6,
  };
 
  const cards = Array.from({ length: 10 }, (_, index) => <Card key={index} />);
 
  const [currentSlide, setCurrentSlide] = useState(0); 
  const sliderRef = useRef(null); 
 
  const nextSlide = () => {
    // Increase the current slide index by the number of slides to scroll
    setCurrentSlide(currentSlide + settings.slidesToScroll);
    // Use the Slider ref to move to the next slide
    sliderRef.current.slickNext();
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