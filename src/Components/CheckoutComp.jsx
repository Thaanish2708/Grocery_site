import { useState, useEffect } from "react";
import OrderCard from './OrderCard';
import "./Checkout.css"

function CheckoutComp(props) {
  const [fetchedProductData, setFetchedProductData] = useState([]); // Use state to store fetched product data

  const [details, setDetails] = useState({
    email:"",
    phone:"",
    fname:"",
    lname:"",
    flat:"",
    street:"",
    city:"",
    state:"",
    zipcode:""
  })

  const [page,setPage] = useState(1);

  const [hover, setHover] = useState(false);
  const [hoverBack, setHoverBack] = useState(false);
  const [hoverContinue, setHoverContinue] = useState(false);
  const [hoverPay, setHoverPay] = useState(false);


  function onHoverIn(){
    setHover(true)
}

function onHoverOut(){
    setHover(false)
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


const [paymentMethod, setPaymentMethod] = useState(''); // State to store the selected payment method

const handlePaymentMethodChange = (method) => {
  setPaymentMethod(method);
};

const handlePayment = () => {
  if (paymentMethod === 'upi') {
    // Handle UPI payment logic (e.g., open a UPI payment app)
    alert('Redirect to UPI payment');
  } else if (paymentMethod === 'cash') {
    // Handle cash payment logic (e.g., display instructions)
    alert('Cash payment selected. Instructions for cash payment will be provided.');
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
    const getCartData = async () => {
      try {
        console.log("1111",props.cartData);
        const data = [];
        for (const prod of props.cartData.cartItems) {
          const response = await fetch(`http://localhost:8080/products/${prod.productId}`, {
            method: "GET",
          });

          if (response.status === 200) {
            const productData = await response.json();
            data.push({"productData":productData,"Qty":prod.quantity});
          } else {
            console.error("Failed to fetch product data.");
          }
        }

        // Set the fetched product data in state
        setFetchedProductData(data);

      } catch (error) {
        console.error("Error:", error);
      }
    };

    getCartData();
  }, []);

  console.log("Fetched Product Data:", fetchedProductData); // Now you can log it when it's available

  console.log("Order Placed");

  return (
    <div className="container-fluid" style={{padding: "0px 110px"}}>
      <div className="row p-0 m-0 ">
      <div className="menu-tabs">

        <div
          className={`menu-tab`}
          style={{backgroundColor: page === 1 ? "rgb(49, 134, 22)" : '', borderRadius:"10px"}}
          >
          Shipping  
        </div>
        <div
          className={`menu-tab`}
          style={{backgroundColor: page === 2 ? "rgb(49, 134, 22)" : '', borderRadius:"10px"}}
        >
          Delivery
        </div>
        <div
          className={`menu-tab`}
          style={{backgroundColor: page === 3 ? "rgb(49, 134, 22)" : '', borderRadius:"10px"}}
        >
          Payment
        </div>
      </div>


        <div className="col-md-8">
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
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>MRP: </b><span style={{marginRight:"12%"}}>₹{props.cartData.totalValue}</span> </p>
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>GST: </b><span style={{marginRight:"12%"}}>₹{props.cartData.totalValue}</span> </p>
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>Delivery Fee: </b><span style={{marginRight:"12%"}}>₹{props.cartData.totalValue}</span> </p>
          <hr />
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>Grand Total: </b><span style={{marginRight:"12%"}}>₹{props.cartData.totalValue}</span> </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComp;
