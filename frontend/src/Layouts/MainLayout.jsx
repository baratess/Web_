import Footer from "../Components/Layout/Footer/Footer";
import Header from "../Components/Layout/Header/Header";
import Policy from "../Components/Layout/Policy/Policy";
import Proptypes from "prop-types";
import Search from "../Components/Modals/Search/Search";
import { useState } from "react";
// import Dialog from "../Components/Modals/Dialog/Dialog";
// import {  useEffect } from "react";

const MainLayout = ({ children }) => {
  const [isSearch, setIsSearch] = useState(false);
  // const [isDialog, setIsDialog] = useState(true);

  // useEffect(() => {
  //   const dialogStatus = localStorage.getItem("dialog")
  //     ? JSON.parse()
  //     : localStorage.setItem("dialog", JSON.stringify(true));
  //   setTimeout(() => {
  //     setIsDialog(dialogStatus), 2000;
  //   });
  // }, []);

  return (
    <div className="main-layout">
      {/* <Dialog isDialog={isDialog} setIsDialog={setIsDialog} /> */}
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
