import React, { useContext, useEffect } from 'react';
import "./EventList.css";
import { UserContext } from '../../Services/CreateContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const { user, setUser, images, setImages } = useContext(UserContext);

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
  }, [setUser]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {  
      fetchImageData();
    }
  }, [user]);

  const fetchImageData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/file/getimage/${user._id}`);
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const isVideo = (url) => {
    return url && url.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <div className="container">
      <div className="gallery-showcase">
        <h1>Gallery Showcase</h1>
        <h2>Capture Life's Moments</h2>
        <p className="photography-intro">
          Welcome to our photography page! Explore our collection of beautiful moments captured through photos and videos.
        </p>
        
        <div className="list-container">
          <div className="row w-100">
            {images.length > 0 ? (
              images.map((item, index) => (
                <div className="col-lg-12 col-sm-12" key={index}>
                  <div className="event-item mb-3">
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                      {isVideo(item.Images[0]) ? (
                        <video width={100} src={item.Images[0]} controls></video>
                      ) : (
                        <img width={100} src={item.Images[0]} alt="Event Thumbnail" />
                      )}
                      <h6 className="m-3">{item.Description}</h6>
                    </div>
                    <button 
                      onClick={() => navigate(`/upload-view/${user?.username}/${user?._id}/${item._id}`)} 
                      className="view-more-button">
                      View More
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Events</h1>
            )}
          </div>
        </div>
        
        <a className="btn add-event-button" href="/upload-form">Add Events</a>
      </div>
    </div>
  );
};

export default EventList;
