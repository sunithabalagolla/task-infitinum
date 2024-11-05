import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Services/CreateContext';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './MediaView.css';

const MediaView = () => {
  const { userName, userId, imageId } = useParams();
  const { images } = useContext(UserContext);
  const [mediaData, setMediaData] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = images.filter((item) => item._id === imageId);
    setMediaData(fetchData);
  }, [images, imageId]);

  const handleDeleteMedia = async (id) => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/file/deleteimage", { imageid: id });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMediaItem = (url) => {
    const fileType = url.split('.').pop().toLowerCase();
    if (['mp4', 'webm', 'ogg'].includes(fileType)) {
      return (
        <video className='media-item' controls>
          <source src={url} type={`video/${fileType}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      return <img className='media-item' src={url} alt="Media" />;
    } else {
      return <p>Unsupported media format.</p>;
    }
  };

  return (
    <div className='media-container'>
      {mediaData.length > 0 ? (
        mediaData.map((item, index) => (
          <div className='media-card' key={index}>
            <div className="media-card-header">
              <h4>{item.Description || "Untitled Media"}</h4>
            </div>
            <div className='media-card-body'>
              <div className="media-grid">
                {item.Images && item.Images.map((url, index) => (
                  <div className='media-item-container' key={index}>
                    {renderMediaItem(url)}
                  </div>
                ))}
              </div>
              <div className='media-card-footer'>
                <h6>Uploaded By: <span className='uploader-name'>{userName}</span></h6>
                <div className='media-actions'>
                  <button 
                    className='btn btn-primary' 
                    onClick={() => navigate(`/edit-media/${userName}/${userId}/${imageId}`)}>
                    Edit Media
                  </button>
                  <button 
                    className='btn btn-success' 
                    data-bs-toggle="modal" 
                    data-bs-target="#shareModal">
                    Share Link
                  </button>
                  <button 
                    className='btn btn-danger' 
                    data-bs-toggle="modal" 
                    data-bs-target="#confirmDeleteModal">
                    Delete Media
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2>No media available.</h2>
      )}

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this media item?</p>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => handleDeleteMedia(mediaData[0]._id)} 
                type="button" 
                className="btn btn-danger">
                {isLoading ? 
                  <span><span className="spinner-border spinner-border-sm me-2"></span>Deleting...</span> 
                  : "Yes, Delete"}
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Link Modal */}
      <div className="modal fade" id="shareModal" tabIndex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="shareModalLabel">Share Media Link</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Click the button below to copy the shareable link:</p>
              <CopyToClipboard text={`http://localhost:5000/upload-copy-view/${userName}/${userId}/${imageId}`}>
                <button 
                  className='btn btn-outline-success' 
                  onClick={() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}>
                  <ContentCopyIcon /> Copy Link
                </button>
              </CopyToClipboard>
              {isCopied && <span className='copied-feedback text-success'>Link copied to clipboard!</span>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaView;
