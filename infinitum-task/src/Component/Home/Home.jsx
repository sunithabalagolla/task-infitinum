import React, { useContext, useEffect } from 'react'
import "./Home.css"
import { UserContext } from '../../Services/CreateContext';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const Home = () => {

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

    fetchImageData();
    
  }, []);

  const fetchImageData = async()=>{
    try {
      const res = await axios.get("https://photography-server-tawny.vercel.app/file/getimage")
      console.log(res.data,"from dbimages")
      setImages(res.data)
    } catch (error) {
    }
  }

  const handlelogout =()=>{
    document.cookie="user =";
    navigate('/login')
  }


  return (
    <div >
      <div className="home">
        <div className='home-container'>
        <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img width={150} height={42} src="https://websitedemos.net/outdoor-adventure-02/wp-content/uploads/sites/351/2020/01/white-logo.png" alt="" />
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon "></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/service">Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/portfolio">Portfolio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#pricing" tabindex="-1" >Pricing</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link " href="/contactus" tabindex="-1" >Contact Us</a>
        </li>
        <li class="nav-item">
        {user?.length !==0 ?(<a class="nav-link profilename" tabindex="-1" > {user?.username} </a>):(<a class="nav-link  " href="/login" tabindex="-1" >Login IN </a>)}
        </li>
        
      </ul>

      {
        user?.length !==0 &&  <div className='profile-bar'>
        <ul>
          <li>
            Profile
          </li>
          <li style={{cursor:"pointer"}} onClick={()=>handlelogout()} >
            Logout
          </li>
        </ul>
      </div>
      }
      
    </div>
  </div>
</nav>

<div className="heropage text-light animate__animated animate__rollIn">
  <div className="heropage-ele-1">
    <h3>
    Explore the Colourful World
    </h3>
    <div className='w-100 d-flex justify-content-center'>
    <hr className='heropage-hr' />
    </div>
    <div className="heropage-ele-2">
      <h1>
      A Wonderful Gift
      </h1>
    </div>

    <div className="heropage-ele-3 mt-5">
      <a href="#">
        Lern More
      </a>
    </div>
  </div>
</div>



        </div> 
        </div>
      </div>
      <div className=" container services animate__animated animate__backInUp mt-5">
  <div className="services-ele-1">
    <h6>
      WHAT WE DO
    </h6>
    <h1>
      Services
    </h1>
  </div>
  <div className="services-ele-2 mt-4">
    <div className="row">
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/b6e85f0610e277f55b3376ec7902339f.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Photography</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="	https://www.24mm.in/uploads/a0cd4e3e59eb159a4098fb880a9ef37f.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Videography</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/94f9e7ab0af64d19d764c3b9c297d600.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Designing</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/f15d72e074467fbe13e990b1de98f1d8.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Editing</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/a3207923a082ffce8aa1f58d7ec88b3d.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Album Printing</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/b8439d1527e6c1ae798c007304ed2306.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>
                                        Led Walls, DJ, Cranes & Live Telecast</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
    </div>
  </div>
</div>
<div id className="container portfolio animate__animated animate__backInUp mt-5">
<div className="services-ele-1">
    <h6>
      WHAT WE DO
    </h6>
    <h1>
      Portfolio
    </h1>
  </div>
  <div className="portfolio-ele-1 mt-4">
    <div className="row">
      {
        images && images.map((item,index)=>{
          return(
            
<div className="col-lg-4 col-md-6 col-12">
        <div className='portfolio-img-banner mb-4'>
          <img src={item.Image} alt="" />
        </div>
      </div>
            
          )
        })
      }
      
    </div>
  </div>
</div>

<div className="container animate__animated animate__backInUp pricing mt-5">
<div className="services-ele-1">
    <h6>
      Packages
    </h6>
    <h1>
      Pricing
    </h1>
  </div>

  <div className="row mt-5">
    <div className="col-lg-4 col-md-6 col-12">
      <div className="pricing-item">
        <h5>
          Standard
        </h5>

        <h2>
          Contact Us
        </h2>

        <h6>
          photo Editing
        </h6>
        <h6>
          Online Gallery
        </h6>

        <a className='mt-2 btn ' href="">
          Request quote
        </a>

      </div>
    </div>
    <div className="col-lg-4 col-md-6 col-12">
      <div id='pricing' className="pricing-item pricing-item-1">
        <h5>
          Premium
        </h5>

        <h2>
          Contact Us
        </h2>

        <h6>
          photo Editing
        </h6>
        <h6>
          Online Gallery
        </h6>

        <a className='mt-2 btn ' href="">
          Request quote
        </a>

      </div>
    </div>
    <div className="col-lg-4 col-md-6 col-12">
      <div className="pricing-item pricing-item-2">
        <h5>
          Platinum
        </h5>
        <h2>
          Contact Us
        </h2>

        <h6>
          photo Editing
        </h6>
        <h6>
          Online Gallery
        </h6>

        <a className='mt-2 btn ' href="">
          Request quote
        </a>

      </div>
    </div>
    
  </div>
</div>
    </div>
  )
}

export default Home
