import { useState,useEffect } from "react";
import "./Card.css"
function Card(props){

    const styles={
        backgroundColor: "white",
        border:"0.5px solid rgb(232, 232, 232)",
        display:"flex",
        flexDirection:"column",
        height:"286px",
        width:"180px",
        padding:"0px",
        boxShadow: "rgba(0, 0, 0, 0.04) 2px 2px 8px",
        borderRadius: "8px"
    }

    const imageStyle = {
        width:"179px",
        height:"140px",
        padding:"0px",
    }

    const [quantity, setQuantity] = useState(0);

    const [success, setSuccess] = useState(false)
    const [cartQty, setCartQty] = useState(0)
    
    console.log("cartqty",cartQty);
    

    const  addClick = async() => {
      
        setSuccess(true)
        setQuantity(quantity + 1);
        try {
            console.log(quantity);
            const response = await fetch(`http://localhost:8080/users/6/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"productId":props.product.id,"quantity":1})
            });
     
            if (response.status === 201) {
                const data = await response.json();

                props.onAddToCart(data)
            } else {
                console.log(response);
                console.log(response.status);
              console.error("Failed to add employee.");
            }
          } catch (error) {
            console.error("Error:", error);
          }

    }

    const incrementQuantity = async() => {
        setSuccess(true)
        setQuantity(quantity + 1);
        console.log(props.product.id,quantity+cartQty);
        try {
            console.log(quantity);
            const response = await fetch(`http://localhost:8080/users/6/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"productId":props.product.id,"quantity":1})
            });
     
            if (response.status === 201) {
                const data = await response.json();

                props.onAddToCart(data)
            } else {
                console.log(response);
                console.log(response.status);
              console.error("Failed to add employee.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
    };

    const decrementQuantity = async() => {
        
        if (quantity > 0) {
        setQuantity(quantity - 1);
        }
        console.log(props.product.id,quantity);
        if(quantity === 1){
            setSuccess(false)
        }
        try {
            console.log(quantity);
            const response = await fetch(`http://localhost:8080/users/6/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"productId":props.product.id,"quantity":-1})
              
            });
            
     
            if (response.status === 201) {
                const data = await response.json();

                props.onAddToCart(data)
            } else {
                console.log(response);
                console.log(response.status);
              console.error("Failed to add employee.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
    };

    useEffect(() => {
    const getcart = async (userId ) => {

      try {
        
        const response = await fetch(`http://localhost:8080/users/6/cart`, {
          method: "GET",
        });
        console.log("adfsfg");
  
        if (response.status === 200) {
            const data =  await response.json();
            props.onAddToCart(data)
            console.log("cartItems",data);
            data.cartItems.map((p,index) => {
              // console.log(props.product.name,p.quantity,props.product.availableQty);
              // console.log("pid",p.productId,props.product.id);
              if(p.productId === props.product.id){
                
                setCartQty(p.quantity)
              
              
                
              }
              
              
              
            })
            //console.log("Products", data);
            
          // Reset the form or perform any other actions as needed
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
    
    return <div className="col-md-1 m-3" style={styles}>
              <img 
              src={props.product.imageUrl}
              alt="profile pic" 
              style={imageStyle}>

              </img>

              <div style={{textAlign:"left",width:"179px",height:"130px"}}>
                  <p style={{fontWeight:"600",marginLeft:"10px", color:"rgb(31, 31, 31)",height:"36px"}}> {props.product.name} </p>
                  <p style={{fontWeight:"100",marginLeft:"10px",height:"36px"}}> {props.product.portionSize} </p>

                  <div style={{display:"flex"}}>
                  <p style={{fontWeight:"500",marginLeft:"10px",height:"36px"}}> ₹{props.product.price} </p>
                  {success ?
                  <div style={{marginLeft:"50px",borderRadius: "3px",width:"80px",height: "30px",color:"rgb(49, 134, 22)",backgroundColor:"rgb(247, 255, 249)",display:"flex"}}>
                      
                      
                      <button className="btn btn-success"  onClick={decrementQuantity}>-</button>
                      <p style={{marginLeft:"2px",marginRight:"2px",fontWeight:"bold"}}>{quantity}</p> 
                      <button className="btn btn-success" disabled = {props.product.availableQty-1 < quantity+cartQty}  style={{textAlign:"center",lineHeight:"-6"}} onClick={incrementQuantity}>+</button>
                      

                  </div>
                  :
                  <button style={{border: "1px solid rgb(49, 134, 22)", marginLeft: "50px", borderRadius: "3px", width: "66px", height: "30px", color: "rgb(49, 134, 22)", backgroundColor: cartQty >= props.product.availableQty ? "rgb(0, 0, 0)" : "rgb(247, 255, 249)" }} onClick={addClick} disabled={cartQty >= props.product.availableQty}>
                      Add
                  </button>

                  
                  } 

                  

                  </div>

              </div>
        
    </div>

}

export default Card;