import React from "react";
import Footer from "../Components/Layout/Footer/Footer";
import Header from "../Components/Layout/Header/Header";
import Policy from "../Components/Layout/Policy/Policy";
import Proptypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Policy />
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: Proptypes.node,
};
