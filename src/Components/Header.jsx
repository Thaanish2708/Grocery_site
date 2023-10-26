import './LoginModal.css'; // Create a new CSS file for your custom styles

import LoginModal from './LoginModal';

function Header() {
  

  return (
    <div class="container-fluid m-0 border-bottom">
      <div class="row m-0 ">
        <div className='col-md-1'>
          <img src="./logo.png" alt="logo" height="100px"/>
        </div>
        

        <form class="col-md-9 mt-auto mb-auto ml-auto" role="search">
          <input type="search" class="form-control text" placeholder="Search..." aria-label="Search" size="100" />
        </form>

        <div  className="col-md-1 mt-auto mb-auto">
          <button type="button" class="btn btn-success" style={{width:"120px", height:"40px"}}>My Cart</button>
        </div> 

        <div  className="col-md-1 mt-auto mb-auto" >
          <LoginModal />
        </div>

      </div>
    </div>
        
  );
}

export default Header;
