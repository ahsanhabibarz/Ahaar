import isEmpty from "../validation/is-empty";
const initialState = {
  isAuthenticated: false,
  user: {},
  restaurants: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_ADMIN":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "SET_RESTAURANTS":
      return {
        ...state,
        restaurants: action.payload
      };
    default:
      return state;
  }
}
