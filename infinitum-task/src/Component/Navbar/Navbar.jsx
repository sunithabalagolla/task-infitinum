import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Services/CreateContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {


    const {user,setUser,images,setImages} =useContext(UserContext)


    const navigate= useNavigate()
  
   
  
    useEffect(() => {
      const cookieValue = document.cookie.split("=")[1];
      if (cookieValue) {
        try {
          const userData = JSON.parse(cookieValue);
          setUser(userData);
          
          
        } catch (error) {
          console.error("Error parsing cookie data:", error);
  
        }
      } else {
        console.log("No user data found in cookie.");
      }
  
      
    }, []);
  
    
  
    const handlelogout = () => {
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUser(null);
      window.location.reload();
      navigate('/login');
      
    }
    
  return (
    <div className='bg-dark'>
      <div className="container">
      <nav class="navbar navbar-expand-lg navbar-light ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img width={150} height={42} src="https://websitedemos.net/outdoor-adventure-02/wp-content/uploads/sites/351/2020/01/white-logo.png" alt="" />
    </a>
    <button class="navbar-toggler btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="btn bg-light navbar-toggler-icon "></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        
        <li class="nav-item">
        {user?.length !==0 ?(<a class="nav-link profilename" tabindex="-1" > {user?.username} </a>):(<a class="nav-link  " href="/login" tabindex="-1" >Login IN </a>)}
        </li>
        
      </ul>

      {
        user?.length !==0 &&  <div className='profile-bar'>
        <ul>
         
          <li style={{cursor:"pointer"}} onClick={()=>handlelogout()} >
            Logout
          </li>
        </ul>
      </div>
      }
      
    </div>
  </div>
</nav>
      </div>
    </div>
  )
}

export default Navbar
