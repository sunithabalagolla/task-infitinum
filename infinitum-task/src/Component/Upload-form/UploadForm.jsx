import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Services/CreateContext';

const UploadForm = () => {
  const { user, setUser, images, setImages } = useContext(UserContext);

  const initialState = {
    Image: "",
    Description: "",
    UploaderName: user?.username || "",  
    UploaderId: user?._id || ""          
  };

  const [isLoading, setIsLoading] = useState(false); 
  const [data, setData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieValue = document.cookie.split("=")[1];
    if (cookieValue) {
      try {
        const userData = JSON.parse(cookieValue);
        setUser(userData);

        
        setData(prevData => ({
          ...prevData,
          UploaderName: userData.username,
          UploaderId: userData._id
        }));

      } catch (error) {
        console.error("Error parsing cookie data:", error);
      }
    } else {
      console.log("No user data found in cookie.");
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loadImage = (event) => {
    var reader = new FileReader();
    reader.onload = function () {
      setData({ ...data, Image: reader.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    console.log(data);
    try {
      
       const res = await axios.post("https://photography-server-tawny.vercel.app/file/uploadimage", data);
      console.log(res);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <div className="upload-form">
        <h1>Upload Media</h1>
        <div className="chatvia-register-form animate__animated animate__backInLeft">
          <form onSubmit={handleSubmit}>
            <div className="col-auto">
              <label style={{color:"black"}} className="sr-only" htmlFor="inlineFormInputGroup">
                Image
              </label>
              <div className="input-group mb-2">
                <input
                  type="file"
                  required
                  name="Image"
                  onChange={loadImage}
                  id="inlineFormInputGroup"
                />
              </div>
            </div>
            <div className="col-auto">
              <label style={{color:"black"}} className="sr-only" htmlFor="inlineFormInputGroup">
                Title
              </label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  id="inlineFormInputGroup"
                  required
                  name="Description"
                  value={data.Description}
                  onChange={handleChange}
                  placeholder="Enter Title"
                />
              </div>
            </div>
            <button type="submit">{isLoading ? <div><div class="spinner-border spinner-border-sm me-3" role="status">
  <span class="visually-hidden"></span>
</div>Adding Media...</div>  :  "Add Media"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
