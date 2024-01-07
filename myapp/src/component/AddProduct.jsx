import React, { useContext, useEffect, useState } from 'react'
import api from './AxiosCofig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AuthContex } from './AuthContext'

const AddProduct = () => {
    const [productData, setProductData ]  = useState({ name: "", price: "", category: "", image: "" })

    const { state } = useContext(AuthContex)

    const router = useNavigate()

    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (productData.name && productData.price && productData.category && productData.image) {
            try {
                const {data} = await api.post('/product/add-product', { name: productData.name, price: productData.price, category: productData.category, image: productData.image, id: state?.user?.id })
                if (data.success) {
                    router('/')
                    toast.success(data.message)
                    setProductData({ name: "", price: "", category: "", image: "" })
                }
            } catch (error) {
                toast.error(error?.response.data.message)
            }
        }
    }

    useEffect(() => {
        if (state?.user && state?.user?.name === undefined) {
            toast.error("please login to access this page")
        }
    }, [state])
    return (
        <div>
             <form onSubmit={handleSubmit}>
                <label>product Name</label><br />
                <input type="text" name="name" onChange={handleChange} value={productData.name}/><br />
                <label>product Price</label><br />
                <input type="number" name="price" onChange={handleChange} value={productData.price} /><br />
                <label>product Category</label><br />
                <input type="text" name="category"  onChange={handleChange} value={productData.category}/><br />
                <label>product Image</label><br />
                <input type="url" name="image" onChange={handleChange} value={productData.image}/><br />
                <input type="submit" />
            </form>
           
        </div>
    )
}

export default AddProduct