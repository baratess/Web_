﻿import "./BlogItem.css";

const BlogItem = () => {
  return (
    <>
      <li className="blog-item">
        <a href="#" className="blog-image">
          <img src="/img/protez.jpg" alt="" />
        </a>
        <div className="blog-info">
          {/* <div className="blog-info-top">
            <span>25 Feb, 2021 </span>-<span>0 Comments</span>
          </div> */}
          <div className="blog-info-center">
            <a href="#">Robotik Oyuncak Kol</a>
          </div>
          <div className="blog-info-bottom">
            <a href="#">Daha Fazla</a>
          </div>
        </div>
      </li>
      <li className="blog-item">
        <a href="#" className="blog-image">
          <img src="/img/3d1.jpg" alt="" />
        </a>
        <div className="blog-info">
          {/* <div className="blog-info-top">
            <span>25 Feb, 2021 </span>-<span>0 Comments</span>
          </div> */}
          <div className="blog-info-center">
            <a href="#">3 Boyutlu Figürler</a>
          </div>
          <div className="blog-info-bottom">
            <a href="#">Daha Fazla</a>
          </div>
        </div>
      </li>
      <li className="blog-item">
        <a href="#" className="blog-image">
          <img src="/img/3d2.jpg" alt="" />
        </a>
        <div className="blog-info">
          {/* <div className="blog-info-top">
            <span>25 Feb, 2021 </span>-<span>0 Comments</span>
          </div> */}
          <div className="blog-info-center">
            <a href="#">Kartal Heykeli</a>
          </div>
          <div className="blog-info-bottom">
            <a href="#">Daha Fazla</a>
          </div>
        </div>
      </li>
    </>
  );
};

export default BlogItem;
