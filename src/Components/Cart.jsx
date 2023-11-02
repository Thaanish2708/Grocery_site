
import Header from "./Header"
import CartCard from "./CartCard";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

function Cart({openModal, closeModal, isModalOpen, id, setId, Loggedin, setLoggedIn}) {

    const location = useLocation();
    const data = location.state

    const [cartItems, setCartItems] = useState([]);

    const [cartData, setCartData] = useState({});

  const handleAddToCart = (data) => {
    // Handle the data received from the Card component, e.g., add it to the cart
    setCartData(data);
    
  };
  

    console.log("cart",cartItems);

    useEffect(() => {
        const getcart = async (userId ) => {
          try {
            
            const response = await fetch(`http://localhost:8080/users/${id}/cart`, {
              method: "GET",
            });
      
            if (response.status === 200) {
                const data =  await response.json();
                setTotalPrice(data.totalValue);
                const promises = data.cartItems.map(async(prod, index) => {

                    const response1 = await fetch(`http://localhost:8080/products/${prod.productId}`, {
                        method: "GET",

                    });
                    const newjson = {"prod": await response1.json(),"Qty":prod.quantity}

                    return newjson;
                });

                // Use Promise.all to wait for all async requests to complete
                const products = await Promise.all(promises);

                setCartItems([...cartItems, ...products]);

            } else {
                console.log(response);
                console.log(response.status);
              console.error("Failed to add employee.");
            }
          } catch (error) {
            console.error("Error:", error);
          };
          
          
        };
        
        getcart();
        }, []);
    
    return (
        <div className="App container-fluid" style={{ marginBottom: "200px" }}>
            
            <hr style={{ marginTop: "-5px" }} />
            <div style={{padding: "0px 110px"}}>
            <h3 style={{textAlign:"left"}}> Your Cart </h3>
            <div className="container-fluid">
                <div className="row p-0 m-0">
                <div className="col-md-8 d-none d-md-block">
                    {cartItems.length > 0 &&
                        cartItems.map((p, index) => {
                        console.log("p", p);
                        return <CartCard data={p} key={index} />;
                        })}
                    </div>

                    <div className="col-md-4 col-sm-12 p-0 m-0">
                        <div style={{
                            height: "30%",
                            border: "1.25px solid black",
                            borderRadius: "5px",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems:"center",
                            marginBottom:"5px",
                            
                        }}>

                            <p> </p>
                            <p style={{ fontSize: "24px",}}>Subtotal({cartItems.length} items): <span style={{fontWeight:"bold"}}>₹{totalPrice}</span></p>
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
                            }} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>Proceed to Pay</button>

                        </div>
                        <div style={{ height: "70%",                            
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