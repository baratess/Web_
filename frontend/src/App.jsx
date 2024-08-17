import "./App.css";
import Blog from "./Components/Blogs/Blog";
import Brands from "./Components/Brands/Brands";
import Campaigns from "./Components/Campaigns/Campaigns";
import CampaignSingle from "./Components/CampaignSingle/CampaignSingle";
import Categories from "./Components/Categories/Categories";
import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";
import Policy from "./Components/Layout/Policy/Policy";
import Products from "./Components/Products/Products";
import Slider from "./Components/Slider/Slider";

function App() {
  return (
    <div>
      <Header />
      <Slider />
      <Categories />
      <Products />
      <Campaigns />
      <Blog />
      <Brands />
      <CampaignSingle />
      <Policy />
      <Footer />
    </div>
  );
}

export default App;
