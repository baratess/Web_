import "./Blog.css";
import BlogItem from "./BlogItem";

const Blog = () => {
  return (
    <section className="blogs">
      <div className="container">
        <div className="section-title">
          <h2 style={{ marginTop: "50px" }}>KENDİ PROJELERİMİZ</h2>
          {/* <p>3D YAZICI İLE YAPTIĞIMIZ PROJELERİMİZ</p> */}
        </div>
        <ul className="blog-list">
          <BlogItem />
        </ul>
      </div>
    </section>
  );
};

export default Blog;
