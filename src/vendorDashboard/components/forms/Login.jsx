
import React ,{useState} from 'react'
import { API_URL } from '../../data/ApiPath';

const Login = ({showWelcomeHandler}) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const loginHandler=async(e)=>{
  e.preventDefault();
  try {
    const response = await fetch(`${API_URL}/vendor/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
 const data = await response.json(); 
    if (response.ok) {
     
      alert('Login successful');
      console.log('Login successful:', data);
      localStorage.setItem('loginToken', data.token); // Store token in localStorage
      setEmail('');
      setPassword('');   
      showWelcomeHandler(); // Call the handler to show welcome page   
      // Handle successful login, e.g., redirect or store token


      const vendorId = data.vendorId; // Assuming the response contains vendorId    
const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
const vendorData = await vendorResponse.json();
    if (vendorResponse.ok) {
      const vendorFirmId = vendorData.vendorFirmId; // Assuming the response contains firmId
      const vendorfirmName=vendorData.vendor.firm[0].firmName;
      console.log("FirmName",vendorfirmName) // Assuming the response contains firmName
      console.log('Vendor data Firm Id:', vendorFirmId);
      localStorage.setItem('firmId', vendorFirmId); 
      localStorage.setItem('firmName', vendorfirmName); // Store firmName in localStorage
      window.location.reload();
    } else {
      console.error('Failed to fetch vendor data:', vendorData.message);
    }
    }  
    else {
      console.error('Login failed:', data.message);
      alert('Login failed. Please check your credentials.');
    }

  } catch (error) {
    console.error('Error during login:', error);
  }

}


  return (
    <div className="loginSection">
      
        <form className='authForm' onSubmit={loginHandler}>

            <h3>Vendor Login</h3>  <br/>
            <label>Email</label> <br/>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email'/>  <br/>
            <label>Password</label>  <br/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />  <br/>

            <div className="btnSubmit">
              <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login