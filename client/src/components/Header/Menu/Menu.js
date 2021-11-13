import React from "react";
import "./Menu.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import { useHistory } from "react-router-dom";

function Menu({ onOpenSidebar, onOpenOverlay, brands, onSetBrands }) {
  const history = useHistory();
  const openSidebarHandler = () => {
    onOpenSidebar();
    onOpenOverlay();
  };
  const clickHandler = (brandName) => {
    onSetBrands(brandName);
    history.push("/products");
  };
  return (
    <div className="menu">
      <div className="menu__item">
        <span>Home</span>
      </div>
      <div className="menu__item">
        <span className="item-brand">Brands</span>
        <div className="drop-down">
          <div className="brands">
            {brands &&
              brands.length !== 0 &&
              brands.map((ele) => (
                <div
                  onClick={() => clickHandler(ele.name)}
                  to={`/products`}
                  key={ele.key}
                >
                  {ele.name}
                </div>
              ))}
          </div>
          <div>
            <img
              src="https://d1rkccsb0jf1bk.cloudfront.net/landingpages/rado/270x350OptRadoTopNav.webp"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="menu__item">
        <span>Products</span>
      </div>
      <div className="menu__item">
        <span>Ladies</span>
      </div>
      <div className="menu__item">
        <span>Mens</span>
      </div>
      <div className="hamburger" onClick={openSidebarHandler}>
        <GiHamburgerMenu />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    brands: state.brand.brands,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenSidebar: () => dispatch({ type: actionTypes.OPEN_SIDEBAR }),
    onOpenOverlay: () => dispatch({ type: actionTypes.OPEN_OVERLAY }),
    onSetBrands: (brandName) =>
      dispatch({ type: actionTypes.FILTER_SET_BRAND, payload: brandName }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
