import React from "react";
import Categories from "../Components/Categories/Categories";
import Products from "../Components/Products/Products";
import CampaignSingle from "../Components/CampaignSingle/CampaignSingle";

const ShopPage = () => {
  return (
    <React.Fragment>
      <Categories />
      <Products />
      <CampaignSingle />
      <Products />
    </React.Fragment>
  );
};

export default ShopPage;
