import React,{useState} from 'react'
import { API_URL } from '../../data/ApiPath';

const Register = ({showLoginHandler}) => {
const [username, setUsername] = useState('');
const [email, setEmail] = useState(''); 
const [password, setPassword] = useState('');
const[error, setError] = useState('');
const [loading, setLoading] = useState(true);

const handleSubmit= async (e)=>{
  e.preventDefault();
  try{
    const response = await fetch(`${API_URL}/vendor/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });
    const data = await response.json();
    if(response.ok){
      console.log('Registration successful:', data);
      setEmail('');
      setUsername('');
      setPassword('');
      setLoading(false);
      setError('');
      alert('Vendor Registration successful');
      showLoginHandler();
    }

      // Optionally redirect or clear form}

  }catch(error){
    console.error('Error during registration:', error);
    setError('Registration failed. Please try again.');
    setLoading(false);
  }




}


  return (
    <div className="registerSection">
        <form className='authForm' onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
                                  <label >UserName</label> <br/>
            <input type="text" name='username'  value ={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your Username'/>  <br/> 
            <label>Email</label> <br/>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email'/>  <br/>
            <label>Password</label>  <br/>
           <input type="password"  name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />  <br/>
            <div className="btnSubmit">
              <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register