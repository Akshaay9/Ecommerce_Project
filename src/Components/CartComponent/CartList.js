import React from "react";
import "./App.css";
import { useCartContextProvider } from "../../Contexts/CartContext/CartContext";
import { NavLink } from "react-router-dom";
import cartEmptyIMG from "../../Assets/undraw_empty_cart_co35.svg";
import { makeAnAPICall } from "../../UtilityFunctions/ProductListUtilityFuntion/APiCalls";
import {
  deleteItem,
  manageQTY,
} from "../../UtilityFunctions/ProductListUtilityFuntion/CartApiCalls";
import { useLoginContext } from "../../Contexts/loginRegistrationContext/loginRegistrationContext";
function CartList() {
  const {
    state: { cartItems, loading },
    cartContextDispatch,
  } = useCartContextProvider();
  const {
    state: { userInfo },
  } = useLoginContext();

  return (
    <>
      <div className="cart-component">
        <div className="cart-heading">Your Cart</div>
        {cartItems.length == 0 && (
          <img className="emptyCartIMG" src={cartEmptyIMG} alt="" />
        )}
        {cartItems.length > 0 &&
          cartItems.map((ele) => (
            <div className="cart-componrnt-container">
              <NavLink to={`/products/${ele.productID._id}`}>
                <div className="cart-component-left">
                  <div className="cart-component-left-img">
                    <img src={ele.productID.images[0].img} alt="" />
                  </div>
                  <div className="cart-component-left-desc">
                    <h2>{ele.productID.name}</h2>
                    <h4>{ele.productID.price}.00₹</h4>
                  </div>
                </div>
              </NavLink>
              <div className="cart-component-mid">
                {ele.inCartQty === ele.productID.inStock && (
                  <span style={{ color: "red" }}>Out Of Stock</span>
                )}
                <div className="cart-component-CTA">
                  <button
                    className="btn-secondary btn-secondary-hr-outline-in secondary-disabled btn-cart-cta"
                    onClick={() =>
                      ele.inCartQty == 1
                        ? deleteItem(
                            ele.productID._id,
                            userInfo,
                            cartContextDispatch,
                            "LOAD_CART_ITEMS"
                          )
                        : manageQTY(
                            ele.productID._id,
                            userInfo,
                            cartContextDispatch,
                            "LOAD_CART_ITEMS",
                            {
                              inCartQty: ele.inCartQty - 1,
                            }
                          )
                    }
                  >
                    -
                  </button>
                  <span>{ele.inCartQty}</span>
                  <button
                    className="btn-secondary btn-secondary-hr-outline-in secondary-disabled
              btn-cart-cta
              "
                    disabled={ele.inCartQty === ele.productID.inStock}
                    onClick={() =>
                      manageQTY(
                        ele.productID._id,
                        userInfo,
                        cartContextDispatch,
                        "LOAD_CART_ITEMS",
                        {
                          inCartQty: ele.inCartQty + 1,
                        }
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cart-component-CTA-bottom">
                  <button
                    className="btn-secondary btn-secondary-hr-outline-in secondary-disabled btn-cart-cta "
                    onClick={() =>
                      deleteItem(
                        ele.productID._id,
                        userInfo,
                        cartContextDispatch,
                        "LOAD_CART_ITEMS"
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart-component-right">
                <h4>Total Price : {ele.inCartQty * ele.productID.price}.00₹</h4>
                <h4 style={{ marginTop: "1rem" }}>
                  Total Quantity : {ele.inCartQty}
                </h4>
              </div>
            </div>
          ))}
        {cartItems.length > 0 && (
          <div className="cart-component-finalDetials">
            <h4>
              Sub-Total Price :{" "}
              {cartItems.reduce(
                (acc, ele) => acc + ele.inCartQty * (ele.productID.price * 1),
                0
              )}
              .00₹
            </h4>

            <h4 style={{ marginTop: "1rem" }}>
              Sub-Total Quantity :{" "}
              {cartItems.reduce((acc, ele) => acc + ele.inCartQty, 0)}
            </h4>
            <NavLink to="/address">
              <button className="btn-primary btn-primary-hr-outline-out checkout-cta">
                Check Out
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

export default CartList;
