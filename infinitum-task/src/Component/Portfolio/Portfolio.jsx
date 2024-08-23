import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Services/CreateContext'
import axios from 'axios'
import DownloadIcon from '@mui/icons-material/Download';

const Portfolio = () => {
  const {user,setUser,images,setImages} =useContext(UserContext)


  useEffect(()=>{
    fetchImageData();
  },[])

  const fetchImageData = async()=>{
    try {
      const res = await axios.get("http://localhost:5000/file/getimage")
      console.log(res.data,"from dbimages")
      setImages(res.data)
    } catch (error) {
    }
  }

  const handleDownload = (item) => {
    
    const link = document.createElement('a');
    link.href = item.Image;

    link.download = item.Description;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
};

  

  return (
    <div>
      <div className="service bg-image">
      <div className='bg-blackshade'>
        <div className="container">
            <h1 className= 'services-h1 text-light'>
                Portfolio
            </h1>
        </div>
        </div>

      </div>

      <div id className="container animate__animated animate__backInUp portfolio mt-5">

  <div className="portfolio-ele-1 mt-4">
    <div className="row">
    {
        images && images.map((item,index)=>{
          return(
            
<div className="col-lg-4 col-md-6 col-12">
        <div className='portfolio-img-banner mb-4'>
          <img src={item.Image} alt="" />
          <div style={{cursor:"pointer"}}  onClick={()=>handleDownload(item)}  className="delete-svg">
          <DownloadIcon/>
          
          </div>
        </div>
        
      </div>
            
          )
        })
      }
      
    </div>
  </div>
</div>
    </div>
  )
}

export default Portfolio
