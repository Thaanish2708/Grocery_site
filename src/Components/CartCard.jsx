

function CartCard({data}){

    return(
        <>
        <div class="card m-0" style={{maxWidth: "100vw", borderLeft: "none", borderRight: "none", borderRadius:"0px",borderTop:"none"}}>
                            <div class="row no-gutters p-2 ">
                                <div class="col-md-4 " >
                                    <img src={data.prod.imageUrl} class="card-img" alt="card" style={{height:"100%"}}/>
                                </div>
                                <div class="col-md-8">
                                <div class="card-body" style={{textAlign:"left"}}>
                                    <h5 class="card-title">{data.prod.name}</h5>
                                    <p class="card-text" style={{fontWeight:"bolder", fontSize:"20px"}}> ₹{data.prod.price} </p>
                                    <p class="card-text"> Size: {data.prod.portionSize}</p>
                                    <p class="card-text"> Qty: {data.Qty}</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                                </div>
                            </div>
        </div>
        </>
    )
}

export default CartCard;