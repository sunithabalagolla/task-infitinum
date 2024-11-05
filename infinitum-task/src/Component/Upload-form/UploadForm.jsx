import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Services/CreateContext';

const UploadForm = () => {
  const { user, setUser } = useContext(UserContext);

  const initialState = {
    Images: [], 
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
  }, [setUser]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loadMedia = async (event) => {
    const files = event.target.files;
    const mediaArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "infinitum-task");
      formData.append("cloud_name", "dhr4xnftl");
     
      const fileType = file.type.split('/')[0];
      
      const uploadEndpoint = fileType === 'video' 
        ? "https://api.cloudinary.com/v1_1/dhr4xnftl/video/upload" 
        : "https://api.cloudinary.com/v1_1/dhr4xnftl/image/upload";

      try {
        
        const res = await axios.post(uploadEndpoint, formData);
        mediaArray.push(res.data.secure_url);
      } catch (error) {
        console.error("Error uploading media to Cloudinary:", error);
      }
    }

    setData({ ...data, Images: mediaArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const res = await axios.post("http://localhost:5000/file/uploadimage", data);
      console.log(res);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
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
                Media
              </label>
              <div className="input-group mb-2">
                <input
                  type="file"
                  required
                  multiple 
                  name="Images"
                  onChange={loadMedia}
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
            <button type="submit">
              {isLoading ? 
                <div>
                  <div className="spinner-border spinner-border-sm me-3" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                  Adding Media...
                </div> 
                : "Add Media"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
