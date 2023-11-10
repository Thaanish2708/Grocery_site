import { useState, useEffect } from "react";
import OrderCard from './OrderCard';
import "./Checkout.css";
import { Navigate, useNavigate } from 'react-router-dom';

function CheckoutComp(props) {
  const navigate = useNavigate()
  const [fetchedProductData, setFetchedProductData] = useState([]);
  const [details, setDetails] = useState({
    email: "",
    phone: "",
    fname: "",
    lname: "",
    flat: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  });

  const [page, setPage] = useState(1);

  const [hover, setHover] = useState(false);
  const [hoverBack, setHoverBack] = useState(false);
  const [hoverContinue, setHoverContinue] = useState(false);
  const [hoverPay, setHoverPay] = useState(false);
  const [MRP,setMRP] = useState(0)
  const [GST,setGST] = useState(0)
  const [GTotal,setGTotal] = useState(0)

  function onHoverIn() {
    setHover(true);
  }

  function onHoverOut() {
    setHover(false);
  }

  const isDetailsFilled = () => {
    return (
      details.email !== "" &&
      details.phone !== "" &&
      details.fname !== "" &&
      details.lname !== "" &&
      details.flat !== "" &&
      details.street !== "" &&
      details.city !== "" &&
      details.state !== "" &&
      details.zipcode !== ""
    );
  };

  const [paymentMethod, setPaymentMethod] = useState('');
const [loading, setLoading] = useState(true);
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = async () => {
    try {
      if (paymentMethod === 'upi') {
        alert('Redirect to UPI payment');
      } else if (paymentMethod === 'cash') {
        alert('Cash payment selected. Instructions for cash payment will be provided.');
      }
      

      const response = await fetch(`http://localhost:8080/orders/${props.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.cartData)
      });

      if (response.status === 200) {
        const data3 = await response.text();
        navigate('/orderHistory')
      }
      
    } catch (error) {

    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  useEffect(() => {
    const { id, cartData } = props;
  
    if (cartData && cartData.cartItems && cartData.cartItems.length > 0) {
      localStorage.setItem("checkoutProps", JSON.stringify({ id, cartData }));
    }
  }, [props.id, props.cartData]);
  

  useEffect(() => {
    const getCartData = async () => {
      try {
        const data = [];
        const storedProps = localStorage.getItem("checkoutProps");
    
        if (storedProps) {
          const { cartData } = JSON.parse(storedProps);
          console.log("cartData.cartItems:", cartData.cartItems); // Add this line
          setMRP(cartData.totalValue)
          setGST((cartData.totalValue * 0.18).toFixed(2))
          setGTotal(cartData.totalValue+(cartData.totalValue * 0.18)+(cartData.totalValue > 500 ? 0 : 50))
          const promises = cartData.cartItems.map(async (prod) => {
            const response = await fetch(`http://localhost:8080/products/${prod.productId}`, {
              method: "GET",
            });
    
            if (response.status === 200) {
              const productData = await response.json();
              data.push({ "productData": productData, "Qty": prod.quantity });
            } else {
              console.error("Failed to fetch product data for productId:", prod.productId);
            }
          });
    
          await Promise.all(promises);
    
          setFetchedProductData(data);
          setLoading(false);
        } else {
          console.error("No stored props found in localStorage.");
          setLoading(false); // Set loading to false even if there's an error
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    
  
    console.log("Before getCartData");
    getCartData();
    console.log("After getCartData");
  }, [props.id]);
  

  if (loading) {
    return <p>Loading...</p>; // Render a loading message or spinner while fetching data
  }
  console.log("Fetched Product Data:", fetchedProductData);
  return (
    <div className="container-fluid" style={{padding: "0px 110px",  marginTop:"70px"}}>
      <div className="row p-0 m-0 ">
      <div className="col-md-8">
      <div className="menu-tabs">

        <div
          className={`menu-tab`}
          style={{backgroundColor: "rgb(49, 134, 22)", borderRadius:"10px",color:"white"}}
          >
          Shipping  
        </div>
        <div
          className={`menu-tab`}
          style={{backgroundColor: page >= 2 ? "rgb(49, 134, 22)" : '', borderRadius:"10px",color: page >= 2?"white":''}}
        >
          Delivery
        </div>
        <div
          className={`menu-tab`}
          style={{backgroundColor: page >= 3 ? "rgb(49, 134, 22)" : '', borderRadius:"10px",color: page >= 3?"white":''}}
        >
          Payment
        </div>
      </div>


        
          {page=== 1? 
          <div> 
            <div style={{marginTop:"10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:"center",
                    marginTop: "10px",
                  }}>
            <input type="email" id="FloatInput" value={details.email} onChange={handleInputChange} name="email" style={{backgroundColor:"#f1f1f1", border:"1px solid #f1f1f1", borderRadius:"10px", height:"45px", width:"240px", padding:"2%",marginLeft:"5px"}} placeholder="Email address" required="true"/>
            <input type="text" value={details.phone} onChange={handleInputChange} name="phone" style={{backgroundColor:"#f1f1f1", border:"1px solid #f1f1f1", borderRadius:"10px", height:"45px", width:"240px", padding:"2%",marginLeft:"5px"}} placeholder="Phone Number"/>
            </div>
            <div style={{marginTop:"10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:"center",
                    marginTop: "10px",
                  }}>
            <input type="text" value={details.fname} onChange={handleInputChange} name="fname" style={{backgroundColor:"#f1f1f1", border:"1px solid #f1f1f1", borderRadius:"10px", height:"45px", width:"240px", padding:"2%",marginLeft:"5px"}} placeholder="First Name"/>
            <input type="text" value={details.lname} onChange={handleInputChange} name="lname" style={{backgroundColor:"#f1f1f1", border:"1px solid #f1f1f1", borderRadius:"10px", height:"45px", width:"240px", padding:"2%",marginLeft:"5px"}} placeholder="Last Name"/>
            </div>

            <div style={{marginTop:"10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:"center",
                  }}>
            <input type="text" value={details.flat} name="flat" onChange={handleInputChange} style={{backgroundColor:"#f1f1f1", border:"1px solid #f1f1f1", borderRadius:"10px", height:"45px", width:"100px", padding:"2%",marginLeft:"5px"}} placeholder="Flat No."/>
            <input type="text" value={details.street} name="street" onChange={handleInputChange} style={{backgroundColor:"#f1f1f1", border:"1px solid #f1f1f1", borderRadius:"10px", height:"45px", width:"380px", padding:"2%",marginLeft:"5px"}} placeholder="Street Name"/>
            </div>
            <div style={{marginTop:"10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:"center",
                  }}>
            <input type="text" value={details.city} name="city" onChange={handleInputChange} style={{backgroundColor:"#f1f1f1", border:"1px solid #f1f1f1", borderRadius:"10px", height:"45px", width:"160px", padding:"2%",marginLeft:"5px"}} placeholder="City"/>
            <input type="text" value={details.state} name="state" onChange={handleInputChange} style={{backgroundColor:"#f1f1f1", border:"1px solid #f1f1f1", borderRadius:"10px", height:"45px", width:"160px", padding:"2%",marginLeft:"5px"}} placeholder="State"/>
            <input type="text" value={details.zipcode} name="zipcode" onChange={handleInputChange} style={{backgroundColor:"#f1f1f1", border:"1px solid #f1f1f1", borderRadius:"10px", height:"45px", width:"160px", padding:"2%",marginLeft:"5px"}} placeholder="Zip Code"/>
            </div>
            <button style={{
                                backgroundColor: hover ? "rgb(247, 255, 249)": "rgb(49, 134, 22)",
                                textAlign:"center",
                                color: hover ? "rgb(49, 134, 22)": "white",
                                marginTop:"15px",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                transition: "background-color 0.3s",
                                border: "1px solid rgb(49, 134, 22)",
                                margin: "15px auto", // Center horizontally
                                display: "block",
                            }} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} onClick={()=>{setHover(false); setPage(2)}} disabled={!isDetailsFilled()} >Continue</button>
          </div> : 
          page===2 ? 
          <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <div style={{marginTop:"10px"}}>
            <p style={{fontSize:"17px", textAlign:"left"}}> <b>Name: </b> {details.fname+" "+details.lname}</p>
            <p style={{textAlign:"left"}}> <b>Phone No. :</b> +91 {details.phone}</p>
            <p><b> Delivery Address: </b></p>
            <p style={{textAlign:"left"}}>{details.flat},{details.street} </p>
            <p style={{textAlign:"left"}}>{details.city},{details.state} </p>
            <p style={{textAlign:"left"}}>{details.zipcode}</p>
            </div>
            <div style={{display: "flex", justifyContent:"center"}}>
            <button style={{
                                backgroundColor: hoverBack ? "rgb(247, 255, 249)": "rgb(49, 134, 22)",
                                textAlign:"center",
                                color: hoverBack ? "rgb(49, 134, 22)": "white",
                                marginTop:"15px",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                transition: "background-color 0.3s",
                                border: "1px solid rgb(49, 134, 22)",
                                margin: "15px", // Center horizontally
                                display: "block",
                            }} onMouseEnter={()=>{setHoverBack(true)}} onMouseLeave={()=>{setHoverBack(false)}} onClick={()=>{setHoverBack(false); setPage(1)}} >Back</button>
            <button style={{
                                backgroundColor: hoverContinue ? "rgb(247, 255, 249)": "rgb(49, 134, 22)",
                                textAlign:"center",
                                color: hoverContinue ? "rgb(49, 134, 22)": "white",
                                marginTop:"15px",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                transition: "background-color 0.3s",
                                border: "1px solid rgb(49, 134, 22)",
                                margin: "15px", // Center horizontally
                                display: "block",
                            }}     onMouseEnter={() => setHoverContinue(true)} onMouseLeave={() => setHoverContinue(false)} onClick={()=>{ setHoverContinue(false); setPage(3)}} >Pay</button>
          </div>
          </div> : 
              <div className="payment-container mt-2">
              <h2>Select Payment Method</h2>
              <div className="payment-options">
                <div className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => handlePaymentMethodChange('upi')}>
                  <span>UPI</span>
                </div>
                
                <div className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => handlePaymentMethodChange('cash')}>
                  <span>Cash</span>
                </div>
              </div>
              <br />
              <div >
              <button style={{
                                backgroundColor: hoverBack ? "rgb(247, 255, 249)": "rgb(49, 134, 22)",
                                textAlign:"center",
                                color: hoverBack ? "rgb(49, 134, 22)": "white",
                                marginTop:"15px",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                transition: "background-color 0.3s",
                                border: "1px solid rgb(49, 134, 22)",
                                marginRight:"10px"
                            }} onMouseEnter={()=>{setHoverBack(true)}} onMouseLeave={()=>{setHoverBack(false)}} onClick={()=>{setHoverBack(false); setPage(2)}} >Back</button>

              <button className="payment-button" style={{
                                backgroundColor: hoverPay ? "rgb(247, 255, 249)": "rgb(49, 134, 22)",
                                textAlign:"center",
                                color: hoverPay ? "rgb(49, 134, 22)": "white",
                                marginTop:"15px",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                transition: "background-color 0.3s",
                                border: "1px solid rgb(49, 134, 22)",
                            }} onMouseEnter={()=>{setHoverPay(true)}} onMouseLeave={()=>{setHoverPay(false)}} onClick={handlePayment}>
                Pay Now
              </button>
              </div>
            </div>}
        </div>
        <div className="col-md-4" style={{ backgroundColor:"#f1f1f1",overflowY: "auto", maxHeight: "78vh", marginTop:"10px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", paddingBottom:"15px"}}>
          {fetchedProductData.map((prod, index) => {
            return <OrderCard data={prod} key={index} />;
          })}
          <br />
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>MRP: </b><span style={{marginRight:"12%"}}>₹{MRP}</span> </p>
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>GST: </b><span style={{marginRight:"12%"}}>₹{GST}</span> </p>
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>Delivery Fee: </b><span style={{marginRight:"12%"}}>₹{props.cartData.totalValue > 500 ? 0 : 50}</span> </p>
          <hr />
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>Grand Total: </b><span style={{marginRight:"12%"}}><b>₹{GTotal}</b></span> </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComp;
