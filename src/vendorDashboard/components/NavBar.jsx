import React from 'react'


const NavBar = ({showLoginHandler,showRegisterHandler,showLogout,showLogoutHandler}) => {

  const firmName = localStorage.getItem('firmName') // Default name if not set

  return (
    <div className="navSection">
        <div className="company">
            Vendor Dashboard
        </div>
        <div>
<h4>Firm Name: {firmName}</h4>
        </div>
        <div className="userAuth">
          <ul>
            {!showLogout?
            <>
<li onClick={showLoginHandler}>Login/ </li>
<li onClick={showRegisterHandler}>Register</li>
            </> :  <li  onClick={showLogoutHandler}>Logout</li>}
          </ul>
           
        </div>


    </div> 
  )
}

export default NavBar