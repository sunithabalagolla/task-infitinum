import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Services/CreateContext';

const EditEvent = () => {
  const { user, images } = useContext(UserContext);
  const { userName, userId, imageId } = useParams();
  const [data, setData] = useState({
    Images: [],  // Changed to 'Images' to match the existing field name
    Description: "",
    UploaderId: userId || "",
    imageId: imageId || ""
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [imagePreview, setImagePreview] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const filterData = images.find((item) => item._id === imageId);
    if (filterData) {
      setData({
        Images: filterData.Images,
        Description: filterData.Description,
        UploaderId: userId,
        imageId: imageId
      });
      setImagePreview(filterData.Images);
    }
  }, [images, imageId, userId]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loadImage = async (event) => {
    const files = event.target.files;
    const mediaArray = [...data.Images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "infinitum-task");
      formData.append("cloud_name", "dhr4xnftl");

      // Check the file type
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

  const handleDeleteImage = (index) => {
    const updatedImages = data.Images.filter((_, i) => i !== index);
    setData({ ...data, Images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      // const res = await axios.post("https://photography-server-tawny.vercel.app/file/updateimage", {
      //   imageId,
      //   ...data
      // });
      const res = await axios.post("https://photography-server-tawny.vercel.app/file/updateimage", {
        imageId,
        ...data
      });
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
    <div className="upload-form">
      <h1>Edit Media</h1>
      <div className="chatvia-register-form animate__animated animate__backInLeft">
        <form onSubmit={handleSubmit}>
          <div className="col-auto">
            <label style={{color:"black"}} className="sr-only" htmlFor="inlineFormInputGroup">Image</label>
            <div className="input-group mb-2">
              <input
                type="file"
                multiple
                name="Images"
                onChange={loadImage}
                id="inlineFormInputGroup"
              />
            </div>
            {imagePreview && data.Images.map((item, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img src={item} alt="Current" width="100" />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'white',
                    width:"100px",
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
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
