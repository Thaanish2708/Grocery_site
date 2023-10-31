import React, { useState } from 'react';
import './LoginModal.css'; // Create a new CSS file for your custom styles

function LoginModal({setId}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [Loggedin,setLoggedIn] = useState(false)

  function changeUsericon(){
    setLoggedIn(true)

  }

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


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // console.log("submitted");
    
      // Check if email is already registered and then proceed with registration
      // You need backend logic for this\
      const response = await fetch(`http://localhost:8080/users/check?mail=${email}`, {
          method: "GET",
        });
  
        if (response.status === 200) {
          console.log("resp",response);
            const data3 =  await response.text();
            console.log("dataaaa",data3);
      
      if(data3==="false"){
        setIsRegistering(true)
        setShowPassword(false);
        // console.log("registering");

      }
    
      
      else{
        setIsRegistering(false)
        setShowPassword(true);
        // console.log("ssss");
        // console.log(email);
      }}

      if(isRegistering){
        const response1 = await fetch(`http://localhost:8080/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({"name":name,"email":email,"password" : password})
        });
  
        if (response1.status === 200) {
            const data1 =  await response1.text();

            console.log(data1);
            closeModal();
            setLoggedIn(true)
        
      }}
      else if(!isRegistering && password){
        console.log("Logging in");
        const response2 = await fetch(`http://localhost:8080/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({"email":email,"password" : password})
        });
        console.log("response1",response2);
  
        if (response2.status === 200) {
            const data2 =  await response2.text();
            console.log(data2);
        
      
      if(data2 != "Incorrect Password" )
        {
            // get userid from B (addcart userid)
            console.log("User Logged in");
            const [userid,name1] = data2.split(' ')
            setId(userid)
            setName(name1)
            setLoggedIn(true)
            setWrongpass(false)
            closeModal();
        }
        else
        {

          setWrongpass(true)
        }
      }
      }
      
    
  };

  return (
    <div>
      { !Loggedin && <button onClick={openModal} className="btn btn-primary">Login</button>}
      { Loggedin && <p> {name} </p>}
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

                  {showPassword && wrongpass && !isRegistering && (<div className="form-group">
                    
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
