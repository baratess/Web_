import Footer from "../Components/Layout/Footer/Footer";
import Header from "../Components/Layout/Header/Header";
import Policy from "../Components/Layout/Policy/Policy";
import Proptypes from "prop-types";
import Search from "../Components/Modals/Search/Search";
import { useState } from "react";

const MainLayout = ({ children }) => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="main-layout">
      <Search isSearch={isSearch} setIsSearch={setIsSearch} />
      <Header setIsSearch={setIsSearch} />
      {children}
      <Policy />
      <Footer />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: Proptypes.node,
};
