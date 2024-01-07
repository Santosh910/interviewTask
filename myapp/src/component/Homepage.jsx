import React, { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import api from './AxiosCofig'

const Homepage = () => {
  const [product, setProduct] = useState([])

  
  useEffect(() => {
    async function getAllProduct() {
      try {
        const response = await api.get('/product/get-all');
        if (response.data.success) {
          setProduct(response.data.products)
        }
      } catch (error) {
        toast.error(error.data.message)
      }
    }
    getAllProduct()
  }, [])

  return (
    <div>
      {product?.length ?
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
          {product.map((pro)=>(
          <div style={{width:"20%",border:"1px solid black",height:"500px",marginBottom:"50px"}}>
            <img src={pro.image} alt="" style={{width:"100%",height:"300px"}} />
            <div>
                <h2>Name:{pro.name}</h2>
                <h3>Price:{pro.price}</h3>
                <h3>Category:{pro.category}</h3>
            </div>
          </div>
          ))}
        </div>  
        :
        <div>Loading.....</div>
    }
    </div>
  )
}

export default Homepage