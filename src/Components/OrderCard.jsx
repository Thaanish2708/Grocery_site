
import { useState, useEffect } from "react";
function OrderCard({data}){
console.log("d1",data);
    return(
        <>
        <div class="card" style={{maxWidth: "100vw",borderLeft: "none", borderRight: "none", borderRadius:"1%",borderTop:"none", marginTop:"5%"}}>
                            <div class="row p-2">
                                <div class="col-md-5 p-2" style={{height:"70px",width:"70px"}} >
                                    <img src={data.productData.imageUrl} class="card-img" alt="card" style={{height:"100%",borderRadius:"15%"}}/>
                                </div>
                                <div class="col-md-7 p-0">
                                <div class="card-body" style={{textAlign:"left"}}>
                                    <p class="card-title">{data.productData.name}</p>
                                    <p class="card-text" style={{display:"flex",padding:"4%", justifyContent:"space-between"}} ><small class="text-muted">Quantity: {data.Qty}</small><span>₹{data.productData.price*data.Qty}</span> </p>
                                </div>
                                </div>
                            </div>
        </div>
        </>
    )
}

export default OrderCard;

// disabled = {props.product.availableQty-1 < data.Qty+cartQty} 