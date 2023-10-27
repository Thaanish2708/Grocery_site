import './LoginModal.css'; // Create a new CSS file for your custom styles

import LoginModal from './LoginModal';
import './LoginModal.css'; // Create a new CSS file for your custom styles


function Header() {
  

  return (
    
      <div class="row m-0 ">
        <div className='col-md-1' style={{height:"15%",marginRight:"15px"}}>
          <img src="./logo.png" alt="logo" height="100vw" />
        </div>
        

        <form class="col-md-8 mt-auto mb-auto" role="search">
          <input type="search" class="form-control text" placeholder="Search..." aria-label="Search" size="100" />
        </form>
        

        <div  className="col-md-1 mt-auto mb-auto" style={{marginLeft:"50px"}}>
        <img src='download.png' height="25vw" width="25vw" /><span>
          <button type="button" class="btn" style={{width:"8vw"}}>My Cart</button> </span>
        </div> 

        <div  className="col-md-1 mt-auto mb-auto" >
          <LoginModal />
        </div>

      </div>
        
  );
}

export default Header;
