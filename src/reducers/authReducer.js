import isEmpty from "../validation/is-empty";
const initialState = {
  isAuthenticated: false,
  user: null,
  data: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
