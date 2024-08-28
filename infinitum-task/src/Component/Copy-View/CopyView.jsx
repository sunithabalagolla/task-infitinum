import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Services/CreateContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';

const CopyView = () => {

    const { userName, userId, imageId } = useParams();
    const { images,setImages } = useContext(UserContext);
    const [filteredData, setFilteredData] = useState([]);
    const [copy, setCopy] = useState(false);
  
    useEffect(() => {
      const filterData = images.filter((item) => item._id === imageId);

      setFilteredData(filterData);
    }, [images, imageId]);

    



    useEffect(() => {
        
          fetchImageData();
        
      }, [userId]);  
    
      const fetchImageData = async () => {
        try {
          const res = await axios.get(`https://photography-server-tawny.vercel.app/file/getimage/${userId}`);
          console.log(res.data, "from dbimages");
          setImages(res.data);
        } catch (error) {
          console.error("Error fetching images:", error);
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
    <div>

        
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
                <h5>UploaderName: <span className='text-danger'>{userName}</span></h5>
                <div className='mt-5'>
                  <button disabled style={{cursor:"not-allowed"}} className='btn ms-1 border-secondary'>Edit</button>
                  <button className='btn ms-1 btn-success' type="button" data-bs-toggle="modal" data-bs-target="#copyModal">
                    Copy
                  </button>
                  <button disabled style={{cursor:"not-allowed"}} type="button" className='btn ms-1 border-secondary' >
                    Delete
                  </button>

                  

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
                          <CopyToClipboard text={item.Image}>
                            <button className='btn ms-2 border-success' onClick={() => {
                              setCopy(true);
                              setTimeout(() => setCopy(false), 2000);
                            }}>
                              <ContentCopyIcon text={`https://photography-client-six.vercel.app/upload-copy-view/${userName}/${userId}/${imageId}`} />
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
    </div>
  )
}

export default CopyView
