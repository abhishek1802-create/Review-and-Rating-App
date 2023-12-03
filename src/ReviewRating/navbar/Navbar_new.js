import React from 'react'
import '../navbar/Navbar_new.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Navbar_new() {

  const navigate = useNavigate();
  const res = localStorage.getItem('user');

  const user = JSON.parse(res);
  const handleLogOut = ()=>{
      localStorage.clear();
  }
  
  return (
    <div className='Navbar'>
      <div className="logo">
        <h1>Review&Rate</h1>
      </div>
      <div className="navList">{
        user?.name?(
          <h3>Welcome:{user.name}</h3>
        ):(
          navigate('/')
        )
      }
        
        <div className="profileImage">
        <img  id="profileImg" src={`http://localhost:9000${user.profilepic}`} alt="profileImage" />
        </div>
        <Link to='/'><button id='logoutButton' onClick={handleLogOut}>Logout</button></Link>
      </div>
    </div>
  )
}

export default Navbar_new