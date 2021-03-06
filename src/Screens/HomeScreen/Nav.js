import React, { useState } from "react";
import { useCartContextProvider } from "../../Contexts/CartContext/CartContext";
import { useWishListContextProvider } from "../../Contexts/WishListContext/WishListContext";
import { useLoginContext } from "../../Contexts/loginRegistrationContext/loginRegistrationContext";
import { NavLink } from "react-router-dom";
import { useToastContext } from "../../Contexts/ToastContext/ToastContext";
import { setAlert } from "../../Contexts/ToastContext/ToastAction";
import { useAddressContext } from "../../Contexts/AddressContext/AddressContext";
function Nav({ showMobileNavNar, setShowMobileNavBar }) {
  const {
    state: { cartItems, loading },
    cartContextDispatch,
  } = useCartContextProvider();

  const {
    state: { userInfo },
    authDispatch,
  } = useLoginContext();
  const {
    state: { wishListItems },
    wishListContextDispatch,
  } = useWishListContextProvider();
  const {
    state: { userAddress },
    addressDispatch,
  } = useAddressContext();

  const { toastDispatch } = useToastContext();

  const lengthOfCartItems = () => {
    const length = cartItems.reduce((acc, ele) => acc + ele.inCartQty, 0);
    return length;
  };

  const logOut = () => {
    authDispatch({ type: "USER_LOGOUT" });
    cartContextDispatch({ type: "CLEAR_CART" });
    wishListContextDispatch({ type: "CLEAR_WISHLIST" });
    addressDispatch({ type: "CLEAR_ADDRESS" });
    setAlert("User has been logged out", "success", toastDispatch);
  };

  return (
    <div>
      <div className="nav">
        <div className="nav_left">
          <div className="nav_logo">
            <NavLink to="/">
              <img
                src="https://static.cure.fit/assets/images/curefit-v-man.svg"
                alt=""
              />
            </NavLink>
          </div>
          <NavLink to="/search">
            <div className="nav_search desktop-hide-it">
              <i className="fas fa-search"></i>
            </div>
          </NavLink>
          <div className="nav_name">
            <NavLink to="/">
              <h2>
                {" "}
                <span style={{ color: "blue" }}>Fit</span> Sharkk
              </h2>
            </NavLink>
          </div>
          <div
            className={`hamberger desktop-hide-it ${
              showMobileNavNar ? "rotateHam" : ""
            }`}
            onClick={() => setShowMobileNavBar(!showMobileNavNar)}
          >
            <div className="ham1"></div>
            <div className="ham2"></div>
            <div className="ham3"></div>
          </div>
        </div>
        <div className="nav_center">
          <ul>
            <NavLink to="/products/mensnewdrop">
              <li className="hr- hr-underline-left li-bold mens-li">Mens</li>
            </NavLink>
            <NavLink to="/products">
              <li className="hr-underline-left li-bold">Products</li>
            </NavLink>

            <NavLink to="/products/womensnewdrop">
              <li className="hr-underline-left li-bold womens-li">Womens</li>
            </NavLink>
          </ul>
        </div>
        <div className="nav_right">
          <NavLink to="/search">
            <div className="nav_search mobile-hide-it">
              <i className="fas fa-search"></i>
            </div>
          </NavLink>

          {userInfo.token ? (
            <div className="user-info nav_logi">
              <ul className="user-details-nav">
                <h3>Welcome</h3>
                <h3>
                  {userInfo.name} <i className="fas fa-chevron-down"></i>
                </h3>
              </ul>
              <ul className="drop-down-info">
                <NavLink to="/profile">
                  <h3>Profile</h3>
                </NavLink>
                <h3 onClick={() => logOut()}>Logout</h3>
              </ul>
            </div>
          ) : (
            <NavLink to="/signup">
              <div className="nav_logi">
                <i className="fas fa-user"></i>
              </div>
            </NavLink>
          )}

          <NavLink to="/wishlist">
            <div className="nav_cart">
              <div className="badge badge-skyBlue">
                <i className="fas fa-heart"></i>
                {wishListItems.length > 0 && (
                  <span>{wishListItems.length}</span>
                )}
              </div>
            </div>
          </NavLink>
          <NavLink to="/cart">
            <div className="nav_cart">
              <div className="badgeContainer1 badge-skyBlue">
                <i className="fas fa-shopping-cart"></i>
                {/* <span>1</span> */}
                {cartItems.length > 0 && <span>{lengthOfCartItems()}</span>}
              </div>
            </div>
          </NavLink>
        </div>
      </div>

      <div
        className={`nav_ul_desktop desktop-hide-it ${
          showMobileNavNar ? "show_nav" : ""
        }`}
      >
        {/* <div className="login">
          <NavLink to="/login">
            <div
              className="nav_login"
              onClick={() => setShowMobileNavBar(false)}
            >
              <i className="fas fa-user"></i>
            </div>
          </NavLink>
        </div> */}
        {/* <div className="nav_mobile_top">
          <ul>
            <h3>Welcome : {userInfo.name}</h3>
          </ul>
          <NavLink to="/profile">
            <h3>Profile</h3>
          </NavLink>
          <h3 onClick={() => logOut()}>Logout</h3>
        </div> */}

        <ul>
          {userInfo.token ? (
            <li className="nav_mobile_top">
              {" "}
              <h3>
                Welcome : {userInfo.name}{" "}
                <i className="fas fa-chevron-down"></i>
              </h3>
              <NavLink to="/profile">
                <h3 onClick={() => setShowMobileNavBar(false)}>Profile</h3>
              </NavLink>
              <li
                onClick={() => {
                  logOut();
                  setShowMobileNavBar(false);
                }}
              >
                Logout
              </li>
            </li>
          ) : (
            <li>
              <NavLink to="/login">
                <div
                  className="nav_login"
                  onClick={() => setShowMobileNavBar(false)}
                >
                  <i className="fas fa-user"></i>
                </div>
              </NavLink>
            </li>
          )}

          <NavLink to="/products/mensnewdrop">
            {" "}
            <li onClick={() => setShowMobileNavBar(false)}>Mens</li>
          </NavLink>

          <NavLink to="/products">
            <li onClick={() => setShowMobileNavBar(false)}>Products</li>
          </NavLink>
          <NavLink to="/products/womensnewdrop">
            <li onClick={() => setShowMobileNavBar(false)}>Womens</li>
          </NavLink>
          <NavLink to="/products/homeworkout">
            <li onClick={() => setShowMobileNavBar(false)}>Home Workout</li>
          </NavLink>
          <NavLink to="/products/gymAccessories">
            <li onClick={() => setShowMobileNavBar(false)}>Gym Accessories</li>
          </NavLink>

          <NavLink to="/products/resistancetrainingequipment">
            <li onClick={() => setShowMobileNavBar(false)}>
              Resistance Training
            </li>
          </NavLink>
          <NavLink to="/products/yogaequipment">
            <li onClick={() => setShowMobileNavBar(false)}>Yoga accessories</li>
          </NavLink>
        </ul>
      </div>

      {/* shiping details */}
      <div className="shipping-details-update">
        <p>Free Shipping when you spend more than $5</p>
      </div>
    </div>
  );
}
export default Nav;
