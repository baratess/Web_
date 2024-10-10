import React from "react";
import Slider from "../Components/Slider/Slider";
import Categories from "../Components/Categories/Categories";
import Products from "../Components/Products/Products";
import Campaigns from "../Components/Campaigns/Campaigns";
import Blog from "../Components/Blogs/Blog";
// import Brands from "../Components/Brands/Brands";
import CampaignSingle from "../Components/CampaignSingle/CampaignSingle";

const HomePage = () => {
  return (
    <React.Fragment>
      <Slider />
      <Categories />
      <Products />
      <Campaigns />
      <Blog />
      {/* <Brands /> */}
      <CampaignSingle />
    </React.Fragment>
  );
};

export default HomePage;
