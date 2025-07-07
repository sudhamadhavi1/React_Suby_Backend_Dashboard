import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin, setShowLogin]=useState(false)
  const [showRegister, setShowRegister]=useState(false)
  const [showFirm, setShowFirm]=useState(false)
  const [showProduct, setShowProduct]=useState(false)
  const [showWelcome, setShowWelcome]=useState(false)
  const [showAllProducts, setShowAllProducts]=useState(false)
  const [showLogout, setShowLogout]=useState(false)
const [showFirmTitle, setShowFirmTitle]=useState(true)



  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');  
    
    if (loginToken ) {
      // User is logged in, show the welcome page
      setShowLogout(true);
    } 
    
  }, []);
  
  
 useEffect(()=>{
  const firmName = localStorage.getItem('firmName');
  if (firmName) {
    setShowFirmTitle(false);
  } 
 }, []);

const showLogoutHandler=()=>{
confirm('Are you sure you want to logout?')

  localStorage.removeItem('loginToken');
  localStorage.removeItem('firmId'); // Remove the token from localStorage
  localStorage.removeItem('firmName'); // Remove the firmName from localStorage
  setShowLogout(false);
  setShowFirmTitle(true);
}

  const showLoginHandler=()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }


  const showRegisterHandler=()=>{
setShowRegister(true)
setShowLogin(false)
setShowFirm(false)
setShowProduct(false)
setShowWelcome(false)
 setShowAllProducts(false)
  }

  const showFirmHandler=()=>{

    if(showLogout){
    setShowFirm(true)
     setShowRegister(false)
     setShowLogin(false)
        setShowProduct(false)
        setShowWelcome(false)
         setShowAllProducts(false)
  }
  else{
    alert('You must be logged in to add a firm.');
    setShowLogin(true)
    setShowRegister(false)
  }
  }

  const showProductHandler=()=>{
     if(showLogout){
    setShowProduct(true)
     setShowFirm(false)
     setShowRegister(false)
     setShowLogin(false)
     setShowWelcome(false)
      setShowAllProducts(false)
     }
     else{
    alert('You must be logged in to add a product.');
    setShowLogin(true)
    setShowRegister(false)
  }
  }
   const showWelcomeHandler=()=>{
    setShowWelcome(true)
    setShowProduct(false)
     setShowFirm(false)
     setShowRegister(false)
     setShowLogin(false)
      setShowAllProducts(false)
  }

  const showAllProductsHandler=()=>{
     if(showLogout){
    setShowAllProducts(true)  
    setShowWelcome(false)
    setShowProduct(false)  
    setShowFirm(false)
    setShowRegister(false)
    setShowLogin(false)
     }
      else{
    alert('You must be logged in to view all products.');
    setShowLogin(true);
    setShowRegister(false)
      }
  }


  return (
   <>
   <section className='landingSection'>
<NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} showLogoutHandler={showLogoutHandler}/>
<div className="collectionSection">
<SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
{showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
{showRegister && <Register showLoginHandler= {showLoginHandler}/> }
{showFirm && showLogout && <AddFirm/>}
{showProduct &&  showLogout && <AddProduct/>}
{showWelcome && <Welcome/>}
{showAllProducts && showLogout && <AllProducts/>}

</div>

   </section>
   </>
  )
}

export default LandingPage