import React,{useState} from 'react'
import { API_URL } from '../../data/ApiPath';

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");

    const handleAddProduct = async (e) => {
        e.preventDefault(); 

        try {
            const loginToken = localStorage.getItem('loginToken');
const firmId = localStorage.getItem('firmId'); // Get the firmId from localStorage
            if (!loginToken || !firmId) {
                console.error('User not authenticated or firmId not found');
                alert('You must be logged in to add a product.');
                return;
            }
            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('price', price);
            formData.append('description', description);

            category.forEach(value => formData.append('category', value)); // Append each category

            formData.append('bestSeller', bestSeller ? 'yes' : 'no'); //
            formData.append('image', image); // Append the image file
            


            const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
                method: 'POST',
                body: formData,
            })
            const   data = await response.json();
            if (response.ok) {  
                console.log('Product added successfully:', data);
                alert('Product added successfully');
                // Reset form fields
                setProductName('');   
                setPrice('');
                setCategory([]);

                setBestSeller(false);

                setImage(null);
                setDescription('');
            }
        } catch (error) {
            console.error('Error adding product:', data.message);    
            alert('Failed to add product. Please try again.');
        }
    }; 







   const handleCategoryChange = (event) => {
const value = event.target.value; 
if(category.includes(value)) {{
  setCategory(category.filter((cat) => cat !== value)); // Remove category if already exists
}}
else{
  setCategory([...category, value]); // Add category if not exists
}
};

const handleBestSellerChange = (event) => {
  const value = event.target.value ==='true'
  setBestSeller(value); // Set the bestSeller state based on the radio button value

 
}

const handleImageUpload = (event) => {
  const selectedImage = event.target.files[0];     
    setImage(selectedImage); // Set the selected file to state
 
};


  return (
     <div className="firmSection">
        <form className="tableForm" onSubmit={handleAddProduct}>
            <h3> Add Product </h3>
             <label>Product Name</label> <br/>
            <input type="text" placeholder='Enter Firm Name' value={productName} onChange={(e)=>setProductName(e.target.value)}/>  <br/>
             <label>Price</label> <br/>
            <input type="text" placeholder='Enter your Email' value={price} onChange={(e)=>setPrice(e.target.value)}/>  <br/>
           

  <div className="check-inp">
              <label>Category</label>
              <div className="checkboxContainer">
                <label>Veg </label> <br/>
                <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
                 <label>Non-Veg </label>  <br/>
                <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>

              </div>

            </div>



            
             <div className="check-inp">
              <label>BestSeller</label>
              <div className="checkboxContainer">
                <label>Yes </label> <br/>
                <input type="radio" value="true" checked={bestSeller===true} onChange={handleBestSellerChange}/>
                 <label>No</label>  <br/> 
                <input type="radio" value="false" checked={bestSeller===false} onChange={handleBestSellerChange}/>


              </div>
              </div>
             <label>Description</label> <br/>
            <input type="text" placeholder='Enter your Email' value={description} onChange={(e)=>setDescription(e.target.value)}/>  <br/>
             <label>Image</label> <br/>
            <input type="file" onChange={handleImageUpload} />  <br/>
            <div className="btnSubmit">
              <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct