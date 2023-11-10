import { Navigate, useNavigate } from "react-router-dom"

function Category({url,name}){
    const navigate = useNavigate();
    async function handleclick()
    { const response = await fetch(`http://localhost:8080/category/name/${name}`,{method:"GET"})
    if (response.status==200) 
    {
        const data = await response.json()
    
        navigate('/Search', {state:data})
    }
    }
    return(
    <div className="col-md-auto mb-3" onClick={handleclick}>
        <img src="c1.jpg"  style={{borderRadius:"5px"}} alt="1 - Paan Corner" width="91vw" height="100vw" />
        <p>{name}</p>
    </div>
    )
}

export default Category;