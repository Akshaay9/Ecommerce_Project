export const cartContextReducerFun = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_CART_ITEMS":
      return {
        ...state,
        cartItems: payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems:[]
      }
    default:
      return state;
  }
};
