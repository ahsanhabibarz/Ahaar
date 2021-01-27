import { combineReducers } from "redux";
import navReducer from "./navReducer";
import authReducer from "./authReducer";
import foodReducers from "./foodReducer";
import adminReducer from "./adminReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export default combineReducers({
  nav: navReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  foods: foodReducers,
  admin: adminReducer
});
