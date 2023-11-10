import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Card';
import './Card.css';

function ProdList({ openModal, closeModal, isModalOpen, categoryName, id,setId, productList, onAddToCart}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: productList.length > 5 ? 5 : productList.length,
    slidesToScroll: productList.length > 5 ? 5 : productList.length,
  };
 

  const nextSlide = () => {
    setCurrentSlide(currentSlide + settings.slidesToScroll);
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide - settings.slidesToScroll);
    sliderRef.current.slickPrev();
  };

  return (
    <div style={{ position: "relative" }}>
      <h4 className='col-md-1' style={{textAlign:"left"}}>{categoryName}</h4>
      <Slider {...settings} ref={sliderRef}>
        {productList.map((product, index) => (
          <div key={index} className="card-container">
            <Card openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} product={product}  id={id} setId={setId} onAddToCart={onAddToCart} />
          </div>
        ))}
      </Slider>
      <div className="slider-buttons" style={{ position: "absolute", left: -5, top: "55%", transform: "translateY(-50%)", zIndex: 2 }}>
        <button onClick={prevSlide} style={{ borderRadius: "50%", backgroundColor: "white", border: "4px solid transparent", boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px" }}>&lt;</button>
      </div>
      <div className="slider-buttons" style={{ position: "absolute", right: -10, top: "55%", transform: "translateY(-50%)", zIndex: 2 }}>
        <button onClick={nextSlide} style={{ borderRadius: "50%", backgroundColor: "white", border: "4px solid transparent", boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px" }}>&gt;</button>
        </div>
    </div>
  );
}

export default ProdList;
