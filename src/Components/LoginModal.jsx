import React, { useState } from 'react';
import './LoginModal.css'; // Create a new CSS file for your custom styles

function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="btn btn-primary" style={{width:"100px", margin:"0px"}}>Login</button>

      {isModalOpen && (
        <div className="modal-container">
          <div className="background-overlay" onClick={closeModal}></div>
          <div className="login-form p-4 shadow">
            <label > Sharan</label>
            <input type='text' name='name'></input>
            <button onClick={closeModal} className="btn btn-secondary">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginModal;

// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
 
// const ImageCarousel = ({ images }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
 
//   return (
// <Slider {...settings}>
//       {images.map((image, index) => (
// <div key={index}>
// <img src={image} alt={`Image ${index + 1}`} />
// </div>
//       ))}
// </Slider>
//   );
// };
 
// export default ImageCarousel;