import { message } from "antd";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Search.css";
import PropTypes from "prop-types";

const Search = ({ isSearch, setIsSearch }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [productName, setProductName] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const inputRef = useRef(null);

  const handleCloseModal = () => {
    setIsSearch(false);
    setSearchResults(null);
    setProductName("");
  };

  const handleSearch = useCallback(
    async (searchQuery) => {
      if (searchQuery.trim().length === 0) {
        setSearchResults(null);
        return;
      }

      try {
        const response = await fetch(
          `${apiUrl}/api/products/search/${searchQuery.trim()}`
        );
        if (!response.ok) {
          message.error("Bir hata oluştu, lütfen tekrar deneyiniz.");
          return;
        } else {
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [apiUrl]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(productName);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [productName, handleSearch]);

  return (
    <div className={`modal-search ${isSearch ? "show" : ""}`}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search a product"
            ref={inputRef}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <button type="button">
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div
            className="results"
            style={{
              display: `${
                searchResults?.length === 0 || !searchResults ? "flex" : "grid"
              }`,
            }}
          >
            {!searchResults && (
              <b
                className="result-item"
                style={{ justifyContent: "center", width: "100%" }}
              >
                Ürün Ara
              </b>
            )}
            {searchResults?.length === 0 && (
              <a
                href="#"
                className="result-item"
                style={{ justifyContent: "center", width: "100%" }}
              >
                Aradığınız Ürün Bulunamadı
              </a>
            )}
            {searchResults?.length > 0 &&
              searchResults?.map((searchItem) => (
                <Link
                  to={`product/${searchItem._id}`}
                  className="result-item"
                  key={searchItem._id}
                  onClick={handleCloseModal}
                >
                  <img
                    src={searchItem.img[0]}
                    className="search-thumb"
                    alt=""
                  />
                  <div className="search-info">
                    <h4>{searchItem.name}</h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">
                      $
                      {(
                        searchItem.price.current -
                        (searchItem.price.current * searchItem.price.discount) /
                          100
                      ).toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  isSearch: PropTypes.bool,
  setIsSearch: PropTypes.func,
};
