import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useLocation } from 'react-router-dom';
import OrderCard from './OrderCard';
import OrderHisCard from './OrderHisCard';
function OrderHistory({openModal, handleAddToCart, closeModal, isModalOpen, id, setId, Loggedin, setLoggedIn})
{const [data,setData] = useState([])
    const[display,setDisplay] = useState(-1);
    const[details,setDetails] = useState({});
    const [fetchedProductData, setFetchedProductData] = useState([]);
    async function handleclick (id)
    // {   console.log(display);
    {
        setDisplay(id)
        console.log("id",id);
        if(id!==-1){
        try{
            const response = await fetch(`http://localhost:8080/orders/fetch/${id}`,{method:"GET"})
            console.log("r1",response);
            if(response.status===200)
            {
                const fdata = await response.json();
                setDetails(fdata)
                console.log("asd",fdata);
            
            try {
                // console.log("1111",props.cartData);
                const data = [];
                for (const prod of fdata.orderItems) {
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
            }
           
        }
        catch{

        }
    }}
    useEffect(() => {
        // Fetch data for each category and store it in productData
        
        const fetchData = async () => {
            try {

                  const response = await fetch(`http://localhost:8080/orders/${id}`, {
                    method: "GET",
                  });
        
                  if (response.status === 200) {
                    const d1 = await response.json();
                    setData(d1)
                    
                  } else {
                    console.error("Failed to fetch order data.");
                  }
                  
                }
                // Set the fetched product data in state

        
               catch (error) {
                console.error("Error:", error);
              }
          
        };
    
        fetchData();

            

      }, [id]);
      console.log("sd",details);
      console.log(fetchedProductData);
    return (
      <>
      <div className="App container-fluid row" style={{padding: "0px 110px"}} >
      <div className="col-md-8">
      {data.map((order,index)=>
      {
        {/* console.log(index,order) */}
        return <OrderHisCard openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} order={order}  id={id} setId={setId} onAddToCart={handleAddToCart} handleclick={handleclick}/>

      })}
      </div>
      
      {display !== -1 && (<div className="col-md-4" style={{ backgroundColor:"#f1f1f1",overflowY: "auto", maxHeight: "78vh", marginTop:"10px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", paddingBottom:"15px"}}>
          {fetchedProductData.map((prod, index) => {
            return <OrderCard data={prod} key={index} />;
          })}
          <br />
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>MRP: </b><span style={{marginRight:"12%"}}>₹{details.totalValue}</span> </p>
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>GST: </b><span style={{marginRight:"12%"}}>₹{(details.totalValue * 0.18).toFixed(2)}</span> </p>
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>Delivery Fee: </b><span style={{marginRight:"12%"}}>₹{details.totalValue > 500 ? 0 : 50}</span> </p>
          <hr />
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",margin:"0px",marginLeft:"5%"}}><b>Grand Total: </b><span style={{marginRight:"12%"}}><b>₹{details.totalValue+(details.totalValue * 0.18)+(details.totalValue > 500 ? 0 : 50)}</b></span> </p>
        </div>) }
        </div>
      </>
    )
}

export default OrderHistory