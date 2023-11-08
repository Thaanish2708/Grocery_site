import { useState, useEffect } from "react";
import OrderCard from './OrderCard';

function CheckoutComp(props) {
  const [fetchedProductData, setFetchedProductData] = useState([]); // Use state to store fetched product data
  const [page,setPage] = useState(3)
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
        <div className="col-md-8 d-none d-md-block">
          {page=== 1? <p> 1</p> : page===2 ? <p> 2</p>: <p>3</p>}
        </div>
        <div className="col-md-4 d-none d-md-block" style={{ backgroundColor:"#f1f1f1",overflowY: "auto", maxHeight: "78vh"}}>
          {fetchedProductData.map((prod, index) => {
            return <OrderCard data={prod} key={index} />;
          })}
          <br />
          <p class="card-text" style={{display:"flex", justifyContent:"space-between",marginLeft:"5%"}}><b>Total: </b><span style={{marginRight:"12%"}}><b>₹{props.cartData.totalValue}</b></span> </p>
          <br />
        </div>
      </div>
    </div>
  );
}

export default CheckoutComp;
