import React from "react";
import "./App.css";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import ShoppingCart from "./components/ShoppingCart";
import ShoppingPage from "./components/ShoppingPage";
import ResturantsPage from "./components/ResturantsPage";
import OrderTracker from "./components/OrderTracker";
import ResturantFoodPage from "./components/ResturantFoodPage";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "./config/firebaseConfig";

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance
};

if (localStorage.uid) {
  store.dispatch({
    type: "SET_PROFILE",
    payload: { uid: localStorage.uid }
  });
}
if (localStorage.udata) {
  store.dispatch({
    type: "SET_DATA",
    payload: JSON.parse(localStorage.getItem("udata"))
  });
}
if (localStorage.adminid) {
  store.dispatch({
    type: "SET_ADMIN",
    payload: { uid: localStorage.adminid }
  });
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <div className="App">
            <div className="container-fluid">
              <div className="row">
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/" component={Homepage} />
                <Route exact path="/cart" component={ShoppingCart} />
                <Route exact path="/shop" component={ShoppingPage} />
                <Route exact path="/resturants" component={ResturantsPage} />
                <Route
                  exact
                  path="/resturant/:oid"
                  component={ResturantFoodPage}
                />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/order" component={OrderTracker} />
                <Route exact path="/profile" component={Profile} />
              </div>
            </div>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
