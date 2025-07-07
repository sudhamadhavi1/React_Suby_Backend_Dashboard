import React , {useState} from 'react'
import { API_URL } from '../../data/ApiPath';

const AddFirm = () => {
const [firmName, setFirmName] = useState('');
const [area, setArea] = useState('');
const [category, setCategory] = useState([]);
const [region, setRegion] = useState([]);
const [offer, setOffer] = useState('');
const [image, setImage] = useState(null);


const handleCategoryChange = (event) => {
const value = event.target.value; 
if(category.includes(value)) {{
  setCategory(category.filter((cat) => cat !== value)); // Remove category if already exists
}}
else{
  setCategory([...category, value]); // Add category if not exists
}
};


const handleRegionChange = (event) => {
const value = event.target.value; 
if(region.includes(value)) {{
  setRegion(region.filter((reg) => reg !== value)); // Remove category if already exists
}}
else{
  setRegion([...region, value]); // Add category if not exists
}
};



const handleImageUpload = (event) => {
  const selectedImage = event.target.files[0];     
    setImage(selectedImage); // Set the selected file to state
 
};


const handleFirmSubmit = async (e) => {
  e.preventDefault(); 
  try{
    const loginToken = localStorage.getItem('loginToken');
    if (!loginToken) {  
      console.error('User not authenticated');
      alert('You must be logged in to add a firm.');
      return
    }

const formData = new FormData();
formData.append('firmName', firmName);  
formData.append('area', area);
formData.append('offer', offer);
formData.append('image', image);

category.forEach(value => formData.append('category', value)); // Append each category
region.forEach(value => formData.append('region', value)); // Append each region


    const response = await fetch(`${API_URL}/firm/add-firm`, {
      method: 'POST',   
      headers: {
        'token': `${loginToken}` // Include the token in the request headers
      },
      body: formData
    });
    const data = await response.json();
    if (response.ok) {
      
      console.log('Firm added successfully:', data);
      alert('Firm added successfully');
      // Reset form fields
      setFirmName('');
      setArea('');
      setCategory([]);
      setRegion([]);
      setOffer('');
      setImage(null);
      const firmId_taken= data.firmId;
      localStorage.setItem('firmId', firmId_taken); // Store the firmId in localStorage

    } else if(data.message==="vendor can have only one firm") {
    
      alert("Firm Exists. only 1 Firm can be added"); // Show error message from the server
    }
    else{
      alert('Failed to add firm. Please try again.');
    }
    


  }catch(error){
    console.error('Error adding firm:', error);
  }
}



  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
             <h3> Add Firm </h3>
             <label>Firm Name</label> <br/>
            <input type="text" placeholder='Enter Firm Name' name="firmName" value={firmName}  onChange={event=>setFirmName(event.target.value)}/>  <br/>
             <label>Area</label> <br/>
            <input type="text" placeholder='Enter your Email' name="area" value={area} onChange={event=>setArea(event.target.value)}/>  <br/>
             {/* <label>Category</label> <br/>
            <input type="text" placeholder='Enter your Email'/>  <br/> */}
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
              <label>Region</label>
              <div className="checkboxContainer">
                <label>North-Indian </label> <br/>
                <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange}/>
                 <label>South-Indian </label>  <br/> 
                <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange}/>
                 <label>Chinese </label>  <br/>
                <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange}/>
                 <label>Bakery </label>  <br/>
                <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange}/>

              </div>

            </div>
             {/* <label>Region</label> <br/>
            <input type="text" placeholder='Enter your Email'/>  <br/> */}
             <label>Offer</label> <br/>
            <input type="text"  name="offer" value={offer} onChange={e=>setOffer(e.target.value)} placeholder='Enter your Email'/>  <br/>
             <label>Image</label> <br/>
            <input type="file" onChange={handleImageUpload}/>  <br/>
            <div className="btnSubmit">
              <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm