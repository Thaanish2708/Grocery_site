import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css'; // Create a new CSS file for your custom styles

function LoginModal({setId,openModal, closeModal,isModalOpen, Loggedin, setLoggedIn, id}) {

  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message,setMessage] = useState(false)
  useEffect(() => {
    const storedUserAuth = localStorage.getItem('userAuth');
    if (storedUserAuth) {
      
      const userAuth = JSON.parse(storedUserAuth);
      
      const { userId, loggedIn, namete } = userAuth;
      setId(userId);
      setName(namete);
      console.log(userAuth,"inside");
      
      
    }

  }, [id]);
  const handleLogout = () => {
    setId(-1);
    setLoggedIn(false);
    setEmail('');
    setConfirmPassword('')
    setPassword('')
    setName('')
    setShowPassword('')
    localStorage.clear();
    navigate('/')
    // Add your logout logic here, e.g., redirect to the login page
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;

    
      
    if (passwordPattern.test(value)) {
      setMessage(true)
    }
    else{
      setMessage(false)
    }
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
          
            const data3 =  await response.text();
            
      
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
            setId(data1)

            
            closeModal();
            setLoggedIn(true)
        
      }}
      else if(!isRegistering && password){
        
        const response2 = await fetch(`http://localhost:8080/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({"email":email,"password" : password})
        });
        
  
        if (response2.status === 200) {
            const data2 =  await response2.text();
            
        
      
      if(data2)
        {
            // get userid from B (addcart userid)
            
            const [userid,name1] = data2.split(' ')
            setId(userid)
            setName(name1)
            setLoggedIn(true)
            // After successful login
            // After a successful login, set both user ID and login status in localStorage
            localStorage.setItem('userAuth', JSON.stringify({ userId:userid, loggedIn: true, namete:name1 }));


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
    <div >
      { !Loggedin && <button onClick={openModal} className="btn btn-primary">Login</button>}
      { Loggedin && <div className="dropdown" style={{display:"flex", position:"relative", flexDirection:"column" ,justifyContent:"center", alignItems:"center" ,padding:"0px"}}> <button  className="dropbtn">  
      <img src='profile.png' height="25vw" width="25vw" /> <p style={{fontWeight:"bold", margin:"0px"}}> {name.charAt(0).toUpperCase() + name.slice(1)} </p> </button>
      <div className="dropdown-content" style={{position:"absolute", top:"100%", left:"10%"}}>
      <a href="#" onClick={()=>{}}>My Account</a>
      <a href="#" onClick={()=>{navigate('/orderHistory')}}>My Orders</a>
      <a href="#" onClick={handleLogout}>Logout</a>
  </div></div>}
      {isModalOpen && (
        <div className="modal-container">
          <div className="background-overlay" onClick={closeModal}></div>
          <div className="login-form p-4 shadow d-flex justify-content-center align-items-center">
            <form className="w-100" onSubmit={handleSubmit}>
              <h2 className="text-center">{isRegistering ? 'Register' : 'Login'}</h2>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control mt-1"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {showPassword && !isRegistering && (<div className="form-group">
                    
                    <input
                      type="password"
                      className="form-control mt-1"
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
                      className="form-control mt-1"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="form-group">
                    
                    <input
                      type="password"
                      className="form-control mt-1"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    
                    <input
                      type="password"
                      className="form-control mt-1"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                  {!message && password !== '' &&  (
          <div style={{ color: 'red' }}>Passwords is weak.</div>
        )}
                  {password !== confirmPassword && confirmPassword !== ''  && (
 
                    <div style={{ color: 'red' }}>Passwords do not match.</div>

                    )}

                    {password === confirmPassword && password !== '' && (

                    <div style={{ color: 'green' }}>Passwords match.</div>

 )}
                </>
              )}
              
              <button type="submit" style={{ margin: "auto", marginRight: "auto" }}
  className="btn btn-primary btn-block d-flex justify-content-center mt-2" disabled={
    !email ||
    (isRegistering
      ? !name || !password || !confirmPassword || (password !== confirmPassword)
      : showPassword ? !password : false)
  }>
                {isRegistering ? 'Register' : 'Login'}
              </button>
              <p className="mt-2" style={{
cursor: 'pointer',  color:"#516078"}} onClick={() => setIsRegistering(!isRegistering)}>
                
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginModal;
