import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Services/CreateContext';

const EditEvent = () => {
  const { user, images } = useContext(UserContext);
  const { userName, userId, imageId } = useParams();
  const [data, setData] = useState({
    Image: "",
    Description: "",
    UploaderId: userId || "",
    imageId:""
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [imagePreview, setImagePreview] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const filterData = images.find((item) => item._id === imageId);
    if (filterData) {
      setData({
        Image: filterData.Image,
        Description: filterData.Description,
        UploaderId: userId,
        imageId:imageId
      });
      setImagePreview(filterData.Image); 
    }
  }, [images, imageId, userId]);

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
    try {
      const res = await axios.post("https://photography-server-tawny.vercel.app/file/updateimage", {
        imageId,
        ...data
      });
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
    <div className="upload-form">
      <h1>Edit Media</h1>
      <div className="chatvia-register-form animate__animated animate__backInLeft">
        <form onSubmit={handleSubmit}>
          <div className="col-auto">
            <label style={{color:"black"}} className="sr-only" htmlFor="inlineFormInputGroup">Image</label>
            <div className="input-group mb-2">
              <input
                type="file"
                name="Image"
                onChange={loadImage}
                id="inlineFormInputGroup"
              />
            </div>
            {imagePreview && <img src={data.Image} alt="Current" width="100" />} 
          </div>
          <div className="col-auto">
            <label style={{color:"black"}} className="sr-only" htmlFor="inlineFormInputGroup">Title</label>
            <div className="input-group mb-2">
              <input
                type="text"
                id="inlineFormInputGroup"
                required
                value={data.Description}
                name="Description"
                onChange={handleChange}
                placeholder="Enter Title"
              />
            </div>
          </div>
          <button type="submit">{isLoading ? <div><div class="spinner-border spinner-border-sm me-3" role="status">
  <span class="visually-hidden"></span>
</div>Updating Media...</div>  :  "Update Media"}</button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
