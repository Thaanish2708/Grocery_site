
import CartCard from "./CartCard";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import './LoginModal.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Cart({openModal, handleAddToCart, closeModal, isModalOpen, id, setId, Loggedin, setLoggedIn, cartData}) {

    const location = useLocation();
    const data = location.state
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);


    const [hover, setHover] = useState(false);
  
    const [cartLen,setCartLen] = useState(0)


    function onHoverIn(){
        setHover(true)
    }
 
    function onHoverOut(){
        setHover(false)
    }

    useEffect(() => {
        const getcart = async ( ) => {
          try {

            
            const response = await fetch(`http://localhost:8080/users/${id}/cart`, {
              method: "GET",
            });
      
            if (response.status === 200) {
                setCartItems([])
                const data =  await response.json();
                setCartLen(data.cartItems.length)
                
                handleAddToCart(data)
                  
                const promises = data.cartItems.map(async(prod, index) => {

                    const response1 = await fetch(`http://localhost:8080/products/${prod.productId}`, {
                        method: "GET",

                    });
                    // console.log(cartLen);
                    // console.log(data.cartItems);
                    const newjson = {"prod": await response1.json(),"Qty":prod.quantity}

                    return newjson;
                    
                });

                // Use Promise.all to wait for all async requests to complete
                const products = await Promise.all(promises);
                setCartItems(products);
                // console.log("1111",cartItems,products);
                

            } else {
                
              console.error("Failed to add employee.");
            }
          } catch (error) {
            console.error("Error:", error);
          };
          
          
        };
        
        getcart();
        }, [id,cartLen]);
        
    
    return (
        <div className="App container-fluid" style={{ marginBottom: "200px" }}>
            
            
            <div style={{padding: "0px 110px"}}>
            <h3 style={{textAlign:"left"}}> Your Cart </h3>
            <div className="container-fluid">
                <div className="row p-0 m-0">
                
                <div className={`col-md-8 d-none d-md-block ${cartData.cartItemsCount === 0 ? 'empty' : ''}`}>
                {cartData.cartItemsCount==0 && (<p style={{fontSize:"14px",margin:"-5%"}}><i>Cart is Empty, Add items </i></p>)}
                    {cartItems.length > 0 &&
                        cartItems.map((p, index) => {
                        
                        return <CartCard data={p} key={index} handleAddToCart = {handleAddToCart} id={id} cartLen={cartLen} setCartLen={setCartLen} />
                        })}
                    </div>

                    <div className="col-md-4 col-sm-12 p-0 m-0">
                        <div style={{
                            border: "1.25px solid black",
                            borderRadius: "5px",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems:"center",
                            marginBottom:"5px",
                            
                        }}>

                            { cartData.totalValue > 500 ?<p style={{fontSize:"14px"}}> Your order is eligible for <b> FREE Delivery.</b> </p> : <p style={{fontSize:"14px"}}>Add items worth <b> ₹{500-cartData.totalValue} </b> to avail <b> FREE Delivery. </b></p>}
                            <p style={{ fontSize: "1.5rem",}}>Subtotal({cartData.cartItemsCount} items): <span style={{fontWeight:"bold"}}>₹{cartData.totalValue}</span></p>
                            <button style={{
                                width:"90%",
                                backgroundColor: hover ? "rgb(247, 255, 249)": "rgb(49, 134, 22)",
                                color: hover ? "rgb(49, 134, 22)": "white",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                transition: "background-color 0.3s",
                                border: "1px solid rgb(49, 134, 22)",
                            }} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} onClick={()=>{navigate('/placeOrder')}}>Proceed to Pay</button>

                        </div>
                        <div style={{                            
                            border: "1.25px solid black",
                            borderRadius: "5px",
                            padding: "20px",
                            marginBottom:"5px",}}>

                        </div>
                    </div>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default Cart 