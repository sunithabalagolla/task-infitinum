import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Services/CreateContext';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const MediaView = () => {
  const { userName, userId, imageId } = useParams();
  const { images } = useContext(UserContext);
  const [filteredData, setFilteredData] = useState([]);
  const [copy, setCopy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const filterData = images.filter((item) => item._id === imageId);
    setFilteredData(filterData);
  }, [images, imageId]);

  const deleteImage = async (id) => {
    setIsLoading(true);
    console.log("sureshhhh", id);
    try {
      const imageid = id;
      await axios.post("https://photography-server-tawny.vercel.app/file/deleteimage", { imageid });
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMedia = (mediaUrl) => {
    const fileExtension = mediaUrl.split('.').pop().toLowerCase();

    if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
      return (
        <video className='mt-2' height={150} width={200} controls>
          <source src={mediaUrl} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return (
        <img className='mt-2' height={150} width={200} src={mediaUrl} alt="" />
      );
    } else {
      return <p>Unsupported media format.</p>;
    }
  };

  return (
    <div className='upload-form'>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div className='card' key={index}>
            <div className="card-header">
              <h6>Title: {item.Description}</h6>
            </div>
            <div className='card-body'>
              {item.Images && item.Images.map((mediaUrl, index) => (
                <div className='col-lg-4 col-md-6 col-sm-6' key={index}>
                  {renderMedia(mediaUrl)}
                </div>
              ))}
              <div className='card-footer'>
                <h6>UploaderName: <span className='text-success'>{userName}</span></h6>
                <div className='mt-3'>
                  <button className='btn ms-1 btn-primary' onClick={() => navigate(`/edit-media/${userName}/${userId}/${imageId}`)}>Edit</button>
                  <button className='btn ms-1 btn-success' type="button" data-bs-toggle="modal" data-bs-target="#copyModal">
                    Share
                  </button>
                  <button type="button" className='btn ms-1 btn-danger' data-bs-toggle="modal" data-bs-target="#deleteModal">
                    Delete
                  </button>

                  {/* Delete Modal */}
                  <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="deleteModalLabel">Delete</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <h5>Are you sure to delete this event?</h5> 😐
                        </div>
                        <div className="modal-footer">
                          <button onClick={() => deleteImage(item._id)} type="button" className="btn btn-danger">
                            {isLoading ? 
                              <div>
                                <div className="spinner-border spinner-border-sm me-3" role="status">
                                  <span className="visually-hidden"></span>
                                </div>
                                Deleting...
                              </div> 
                              : "✔️ Yes"}
                          </button>
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">❌ No</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Copy Modal */}
                  <div className="modal fade" id="copyModal" tabIndex="-1" aria-labelledby="copyModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="copyModalLabel">Copy</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Click to Copy the Link
                          <CopyToClipboard text={`https://photography-client-six.vercel.app/upload-copy-view/${userName}/${userId}/${imageId}`}>
                          
                            <button className='btn ms-2 border-success' onClick={() => {
                              setCopy(true);
                              setTimeout(() => setCopy(false), 2000);
                            }}>
                              <ContentCopyIcon />
                            </button>
                          </CopyToClipboard>
                          {copy && <div className=' ms-3 btn text-success'>Copied</div>}
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">❌ Close</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No image found.</h1>
      )}
    </div>
  );
};

export default MediaView;
