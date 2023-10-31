
import Header from "./Header"
import CartCard from "./CartCard";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

function Cart() {

    const location = useLocation();
    const data = location.state

    const [cartItems, setCartItems] = useState([]);

    

    console.log("cart",cartItems);

    useEffect(() => {
        const getcart = async (userId ) => {
          try {
            
            const response = await fetch(`http://localhost:8080/users/4/cart`, {
              method: "GET",
            });
      
            if (response.status === 200) {
                const data =  await response.json();
                const promises = data.cartItems.map(async (prod, index) => {
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
            <Header data={data}/>
            <hr style={{ marginTop: "-5px" }} />

            <h3 style={{textAlign:"left"}}> Your Cart </h3>
            <div className="container-fluid p-0 m-0" style={{ padding: "0px 110px" }}>
                <div className="row p-0 m-0">
                <div className="col-md-8 d-none d-md-block p-0 m-0">
                    {cartItems.length > 0 &&
                        cartItems.map((p, index) => {
                        console.log("p", p);
                        return <CartCard data={p} key={index} />;
                        })}
                    </div>

                    <div className="col-md-4 col-sm-12 p-0 m-0">
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Cart 