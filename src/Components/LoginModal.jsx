import React, { useState } from 'react';
import './LoginModal.css'; // Create a new CSS file for your custom styles

function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const [wrongpass,setWrongpass] = useState(false)
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    const mailid = {"sharan@g1.com":"pass1"}
    // console.log("submitted");
    
      // Check if email is already registered and then proceed with registration
      // You need backend logic for this
      if(!(email in mailid)){
        setIsRegistering(true)
        setShowPassword(false);
        // console.log("registering");

      }
    
      
      else{
        setIsRegistering(false)
        setShowPassword(true);
        // console.log("ssss");
        // console.log(email);
      }

      if(isRegistering){
        // post user in B
      }
      else if(!isRegistering && password){
        
        if(mailid[email] === password)
        {
            // get userid from B (addcart userid)
            console.log("User Logged in");
            setWrongpass(false)
        }
        else
        {
          setWrongpass(true)
        }
      }
      
    
  };

  return (
    <div>
      <button onClick={openModal} className="btn btn-primary">Login</button>

      {isModalOpen && (
        <div className="modal-container">
          <div className="background-overlay" onClick={closeModal}></div>
          <div className="login-form p-4 shadow d-flex justify-content-center align-items-center">
            <form className="w-100" onSubmit={handleSubmit}>
              <h2 className="text-center">{isRegistering ? 'Register' : 'Login'}</h2>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {showPassword && !isRegistering && (<div className="form-group">
                    
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>)}

                  {showPassword && wrongpass && (<div className="form-group">
                    
                    <label style={{color:"red"}}> Wrong Password</label>
                  </div>)}
              

              
              {(isRegistering) && (
                <>
                  <div className="form-group">
                  
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="form-group">
                    
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                </>
              )}
              <button type="submit" className="btn btn-primary btn-block" disabled={
    !email ||
    (isRegistering
      ? !name || !password || !confirmPassword
      : showPassword ? !password : false)
  }>
                {isRegistering ? 'Register' : 'Login'}
              </button>
              <p className="mt-2" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginModal;
