import React, { useState } from 'react'
import "./Contactus.css"
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Contactus = () => {

  const initialState = {
    Name: "",
    Email: "",
    Subject: "",
    Message:""
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const handleChange =(e)=>{
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
   try {
    const response = await axios.post("https://photography-server-tawny.vercel.app/contactus/contactus",data);
    console.log(response.data,"from contactdb");
    window.location.reload();
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <div>
      <div className="service bg-image">
        <div className='bg-blackshade'>
        <div className="container">
            <h1 className= 'services-h1 text-light'>
                Contact Us
            </h1>
        </div>
        </div>
      </div>

      <div className="main animate__animated animate__backInUp">
        <div className="contact-us-area-wrapper">
          <div className="container">
            <div className="row g-4 gx-5">
              <div className="col-md-5 col-lg-4">
                <div className="address-wrapper">
                  <div className="title-section">
                    <h4 className="title">Contact with us</h4>
                  </div>
                  <ul
                    class="address-list"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <li class="single-address-item">
                      <div class="icon-box">
                        <CallOutlinedIcon />
                      </div>
                      <div class="content">
                        <h5 class="title">Call us:</h5>
                        <p class="info">+91 8520848585</p>
                      </div>
                    </li>
                    <li class="single-address-item">
                      <div class="icon-box">
                        <EmailOutlinedIcon />
                      </div>
                      <div class="content">
                        <h5 class="title">Email us:</h5>
                        <p class="info">ss.Photography@gmail.com</p>
                      </div>
                    </li>
                    <li class="single-address-item">
                      <div class="icon-box">
                        <QueryBuilderOutlinedIcon />
                      </div>
                      <div class="content">
                        <h5 class="title">Service Hour:</h5>
                        <p class="info">10.00 am - 08.00 pm</p>
                      </div>
                    </li>
                    <li class="single-address-item">
                      <div class="icon-box">
                        <LocationOnOutlinedIcon />
                      </div>
                      <div class="content">
                        <h5 class="title">Address:</h5>
                        <p class="info">
                          Ameerpet, Hyderabad, Telangana 
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-7 col-lg-8">
                <div className="get-in-touch-wrapper">
                  <h3 className="title">Get in touch</h3>
                  <div className="w-100"> </div>
                  <form
                    class="custom-form-builder-form "
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <input type="hidden" name="custom_form_id" value="1" />
                    <div class="error-message"></div>
                    <div class="form-group">
                      <label style={{ fontWeight: "500" }} for="name">
                        Your Name
                      </label>{" "}
                      <input
                        type="text"
                        id="name"
                        name="Name"
                        value={data.Name}
                        onChange={handleChange}
                        class="form-control"
                        placeholder="Your Name"
                        required="required"
                      />
                    </div>{" "}
                    <div class="form-group">
                      {" "}
                      <label style={{ fontWeight: "500" }} for="your-mail">
                        Your Email
                      </label>{" "}
                      <input
                        type="email"
                        id="your-mail"
                        name="Email"
                        value={data.Email}
                        onChange={handleChange}
                        class="form-control"
                        placeholder="Your Email"
                        required="required"
                      />
                    </div>{" "}
                    <div class="form-group">
                      <label style={{ fontWeight: "500" }} for="your-subject">
                        Your Subject
                      </label>{" "}
                      <input
                        type="text"
                        value={data.Subject}
                        onChange={handleChange}
                        id="your-subject"
                        name="Subject"
                        class="form-control"
                        placeholder="Your Subject"
                      />
                    </div>{" "}
                    <div class="form-group textarea">
                      <label style={{ fontWeight: "500" }} for="your-message">
                        Your Message
                      </label>{" "}
                      <textarea
                        name="Message"
                        value={data.Message}
                        onChange={handleChange}
                        id="your-message"
                        cols={25}
                        rows={5}
                        class="form-control "
                        placeholder="Your Message"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <button
                        type="submit"
                        style={{
                          marginTop: "20px",
                          fontSize: "18px",
                          fontWeight: "500",
                        }}
                        class=" btn contact-btn btn-submit btn-sm default-btn btn-default"
                      >
                        Submit
                      </button>
                      
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15225.714626787256!2d78.43432064679601!3d17.439185735306857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c55bb43183%3A0x1abc135b23ee2703!2sAmeerpet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1714808606570!5m2!1sen!2sin"
          style={{
            height: "500px",
            width: "100%",
            marginTop: "15px",
            borderRadius: "8px",
          }}
        ></iframe>
      </div>
    </div>
  )
}

export default Contactus
