import React from 'react'
import "./Footer.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';


const Footer = () => {
  return (
    <div>
      <div className="service bg-image">
      <div className='bg-blackshade'>
        <div className="container">
            <div className= 'services-h1 text-light'>
            <a class="navbar-brand" href="/">
      <img width={150} height={42} src="https://websitedemos.net/outdoor-adventure-02/wp-content/uploads/sites/351/2020/01/white-logo.png" alt="" />
    </a>
    <div className=" row ">
<div className='col-lg-4 col-md-6 col-12'>
    <div className='footer-svg m-2'>
<LocationOnIcon/>
    </div>
    <h5>
        Ameerpet, Hyderabad, Telangana
    </h5>
</div>
<div className='col-lg-4 col-md-6 col-12'>
    <div className='footer-svg m-2'>
<MailOutlineIcon/>
    </div>
    <h5>
        SS.photography@gmail.com
    </h5>
</div>
<div className='col-lg-4 col-md-6 col-12'>
    <div className='footer-svg m-2'>
<PhoneIcon/>
    </div>
    <h5>
        8520848585
    </h5>
</div>
    </div>
            </div>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Footer
