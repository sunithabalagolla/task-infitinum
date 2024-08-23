import React from 'react'
import "./Service.css";

const Service = () => {


  return (
    <div>
      <div className="service bg-image">
        <div className='bg-blackshade'>
        <div className="container">
            <h1 className= 'services-h1 text-light'>
                Services
            </h1>
        </div>
        </div>
      </div>
      <div className=" container animate__animated animate__backInUp services mt-5">
  {/* <div className="services-ele-1">
    <h6>
      WHAT WE DO
    </h6>
    <h1>
      Services
    </h1>
  </div> */}
  <div className="services-ele-2 mt-4">
    <div className="row">
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/b6e85f0610e277f55b3376ec7902339f.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Photography</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="	https://www.24mm.in/uploads/a0cd4e3e59eb159a4098fb880a9ef37f.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Videography</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/94f9e7ab0af64d19d764c3b9c297d600.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Designing</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/f15d72e074467fbe13e990b1de98f1d8.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Editing</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/a3207923a082ffce8aa1f58d7ec88b3d.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>Album Printing</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <a href="#">
        <div className="services-img-banner">
<img src="https://www.24mm.in/uploads/b8439d1527e6c1ae798c007304ed2306.jpg" alt="" />
<div class="desc">
                                    <div class="con">
                                        <div class="twofourmm-icon"><i class="fa fa-camera"></i> </div>
                                        <h3>
                                        Led Walls, DJ, Cranes & Live Telecast</h3>
                                    </div>
                                </div>
</div>
        </a>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Service
