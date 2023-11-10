
import { useState, useEffect } from "react";
function OrderHisCard({order,handleclick}){

// console.log("d1",data);
    return(
        <>
        <div className="card col-12" onClick={()=>{handleclick(order.id)}} style={{backgroundColor:"#f1f1f1", borderRadius: "50%", maxWidth: "35vw",cursor:"pointer" ,borderLeft: "none", borderRight: "none", borderRadius:"2%",borderTop:"none", marginTop:"2%"}}>
                            <div class="row p-2">
                                {/* <div class="col-md-4 p-2" style={{height:"70px",width:"70px"}} >
                                    <img src={data.order.imageUrl} class="card-img" alt="card" style={{height:"100%",borderRadius:"15%"}}/>
                                </div> */}
                                <div class="col-md-8 p-0">
                                <div class="card-body m-0" style={{textAlign:"left", padding:"0px"}}>
                                    <p class="card-title" style={{margin:"0px", marginTop:"5px", display:"flex", justifyContent:"space-evenly"}}>Order ID : {order.id}<span>Order Value :<b>₹{order.totalValue+(order.totalValue * 0.18)+(order.totalValue > 500 ? 0 : 50)}</b></span></p>
                                    <p class="card-text" style={{display:"flex", justifyContent:"space-evenly"}} ><small class="text-muted">Order Status : </small><span style={order.status === 'PENDING' ?{color:"red"}:{color:"green"}}>{order.status}</span> </p>
                                </div>
                                </div>
                            </div>
        </div>
        </>
    )
}

export default OrderHisCard;

// disabled = {props.product.availableQty-1 < data.Qty+cartQty} 