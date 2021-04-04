import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAllProductsContextContext } from "../../Contexts/SearchAndIndividualScreenContext/SearchAndindiScreen";
function SearchBarProducts() {
  const {
    state: { searchResult },
    allProductsDispatch,
  } = useAllProductsContextContext();
  const [input, setInput] = useState("");

// useRef focus
    const inputEl = useRef(null)
    useEffect(() => {
        inputEl.current.focus()
    }, [])
      // to dispatch all prods
    useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("/api6/products/all");
        allProductsDispatch({
          type: "initialAllProducts",
          payload: data.data.products,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (input.length > 0) {
      allProductsDispatch({ type: "SEARCH_RESULTS", payload: input });
    } else {
      allProductsDispatch({ type: "CLEAR_SEARCH", payload: input });
    }
  }, [input]);
    
 

  return (
    <div>
          <input
              className="search-comp-input"
              type="text"
             
        value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={inputEl }/>
      <div className="grid-container">
        {input.length > 0 &&
          searchResult.map((ele) => (
            <div className="card-container" key={ele.id}>
              <div className="card-container-header">
                <NavLink to={`/products/${ele.id}`}>
                  <img src={ele.images[0].img} alt="" />
                </NavLink>
                {/* calling the program so that it  automatiaaly renders ADD to cart button or increase the qty buttons */}
              </div>
              <div className="card-container-footer">
                <div className="card-container-footer-row-one">
                  <span>New</span>
                  <h4>{ele.price}.00₹</h4>
                </div>
                <div className="card-container-footer-row-two">
                  <NavLink to={`/products/${ele.id}`}>
                    {" "}
                    <h2>{ele.name}</h2>{" "}
                  </NavLink>
                  <div className="card-container-footer-row-three">
                    <p>{ele.color}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchBarProducts;
