
import { useState, useEffect } from "react";
function CartCard({data, handleAddToCart, id, cartLen,setCartLen}){

    const [qty, setQty] = useState(data.Qty);

    const [cartQty, setCartQty] = useState(0);

    const incrementQuantity = async() => {
        try {

            const response = await fetch(`http://localhost:8080/users/${id}/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"productId":data.prod.id,"quantity":1})
            });
     
            if (response.status === 201) {
                const data_resp = await response.json();
                handleAddToCart(data_resp)
                setQty(qty+1)
            } else {
               
              console.error("Failed to add employee.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
    };

    const decrementQuantity = async() => {
        try {

            const response = await fetch(`http://localhost:8080/users/${id}/cart/remove`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"productId":data.prod.id,"quantity":1})
            });
     
            if (response.status === 200) {
                const data_resp = await response.json();
                handleAddToCart(data_resp)
                    setQty(qty-1)
                    // console.log(qty-1);
                    if(qty==1){
                      setCartLen(prevCartLen => prevCartLen - 1);
                      // console.log("deleted");
                    }
                  // }

                
            } else {
               
              console.error("Failed to add employee.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
    };

    useEffect(() => {
        const getcart = async () => {
          try {
            
            
            const response = await fetch(`http://localhost:8080/users/${id}/cart`, {
              method: "GET",
            });
            if (response.status === 200) {
                const data1 =  await response.json();
                handleAddToCart(data1)
                
                
                data1.cartItems.map((p,index) => {
                  if(p.productId === data.prod.id){
                    if(p.quantity<=0){
                        setCartLen(cartLen-1)
                        
                    
                        
                    }
                    
                    setCartQty(p.quantity)
                 }   
                })
            } else {
                
              console.error("Failed to add employee.");
            }
          } catch (error) {
            console.error("Error:", error);
          };
    
          
        };
        getcart();
        }, [id]);

    return(
        <>
        <div class="card m-0" style={{maxWidth: "100vw", borderLeft: "none", borderRight: "none", borderRadius:"0px",borderTop:"none"}}>
                            <div class="row no-gutters p-2 ">
                                <div class="col-md-5 " >
                                    <img src={data.prod.imageUrl} class="card-img" alt="card" style={{height:"100%"}}/>
                                </div>
                                <div class="col-md-7">
                                <div class="card-body" style={{textAlign:"left"}}>
                                    <h5 class="card-title">{data.prod.name}</h5>
                                    <p class="card-text" style={{fontWeight:"bolder", fontSize:"20px"}}> ₹{data.prod.price} </p>
                                    <p class="card-text"> Size: {data.prod.portionSize}</p>
                                    <div style={{marginLeft:"50px",borderRadius: "3px",width:"80px",height: "30px",color:"rgb(49, 134, 22)",backgroundColor:"rgb(247, 255, 249)",display:"flex"}}>
                                        <button className="btn btn-success" onClick={decrementQuantity} disabled={qty <= 0} >-</button>
                                        <p style={{marginLeft:"2px",marginRight:"2px",fontWeight:"bold"}}>{qty}</p> 
                                        <button className="btn btn-success"  style={{textAlign:"center",lineHeight:"-6"}} onClick={incrementQuantity} disabled = {data.prod.availableQty-1 < qty}>+</button>
                                    </div>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                                </div>
                            </div>
        </div>
        </>
    )
}

export default CartCard;

// disabled = {props.product.availableQty-1 < data.Qty+cartQty} 