import React from 'react'
import { Link } from "react-router-dom";

const Navbar = ({user}) => {
  const logout = () => {
    window.open("https://mym-task-ruby.vercel.app/auth/logout", "_self");
  };

  return (
    <>
    <div className='navbar'>
        <span className='logo'><Link className="link" to="/">
          MYM
        </Link></span>
        {user ? (
        <ul className="list">
          
          <li className="listItem">{user.username}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <>
        <Link className="link" to="login">
          Login
        </Link>
        <Link className="link" to="register">
         Register
      </Link>
        </>
        
      )}
        
    </div>
    </>
  )
}

export default Navbar