import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
class Cart extends Component {
  render() {
    let contents = "";
    if (this.props.cart.data && this.props.cart.data.users) {
      let user = this.props.cart.data.users[
        Object.keys(this.props.cart.data.users)[0]
      ];
      if (user.cart) {
        contents = (
          <div>
            <Link to="/cart">
              <i
                style={{
                  fontSize: "18px",
                  marginRight: "4px"
                }}
                className="fas fa-shopping-cart"
              ></i>
              <span className="cartNo bold">
                {Object.keys(user.cart).length}
              </span>
            </Link>
          </div>
        );
      }
    }

    return contents;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    firebase: state.firebase,
    cart: state.firestore
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: "users",
      doc: props.auth.user.uid,
      subcollections: [{ collection: "cart" }]
    }
  ])
)(withRouter(Cart));
