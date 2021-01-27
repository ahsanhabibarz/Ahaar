const initialState = {
  cartItems: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
}
