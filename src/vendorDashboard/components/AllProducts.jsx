import React, {useState,useEffect} from 'react'
import { API_URL } from '../data/ApiPath'

const AllProducts = () => {
const [products, setProducts] = useState([])

const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId')
    try{
        const response = await fetch(`${API_URL}/product/${firmId}/products`)
        const newProductsData = await response.json()
        setProducts(newProductsData.products)
        console.log(newProductsData)    
    }
    catch (error) {
        console.error('Error fetching products:', error);
        alert
    }
}

useEffect(() => {
    productsHandler()
    console.log('useEffect called')
}, [])


const deleteProductHandler = async (productId) => {
    const firmId = localStorage.getItem('firmId')
    try {
        const response = await fetch(`${API_URL}/product/${productId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setProducts(products.filter(product => product._id !== productId));
            confirm('Are you sure you want to delete this product?');
            alert('Product deleted successfully');
        } 
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
    }
}



  return (
    <div>
      {(!products || products.length === 0) ? (
        <p>No product found</p>
      ) : (
        <table className='product-table'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    src={`${API_URL}/uploads/${product.image}`}
                    alt={product.productName}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>
                  <button onClick={() => deleteProductHandler(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts