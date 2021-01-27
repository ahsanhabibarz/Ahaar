import React, { Component } from "react";
import { Card, CardBody, Button } from "shards-react";
import { Form, FormGroup, FormInput } from "shards-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToCart } from "../actions/cartActions";
import { getFoodItems } from "../actions/foodActions";
import { withRouter, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import NavExample from "./Navbar";
import classnames from "classnames";
import Slider from "./Slider";
import OurServices from "./OurServices";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

class ResturantsPage extends Component {
  constructor() {
    super();
    this.state = {
      hoverClass: false,
      key: "",
      showKey: "",
      showdetails: false,
      showItem: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onhover = this.onhover.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(key) {
    console.log(key);
  }

  onClose() {
    this.setState({
      showKey: "",
      showdetails: false
    });
  }

  addToCart(id) {
    if (this.props.auth.isAuthenticated) {
      let item = this.props.foods.filter(function(it) {
        return it.id === id;
      });

      const userData = {
        item: item,
        uid: this.props.auth.user.uid
      };

      this.props.addToCart(userData);
    } else {
      this.props.history.push("/login");
    }
  }

  onhover(key) {
    this.setState({ hoverClass: true, key: key });
  }
  onLeave() {
    this.setState({ hoverClass: false, key: "" });
  }

  componentDidMount() {
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push("/login");
    // }
    this.props.getFoodItems();
  }

  render() {
    const foodItems = this.props.restaurants;

    let contents;

    if (foodItems) {
      contents = (
        <div
          className="hpbg"
          style={{
            width: "100%"
          }}
        >
          <NavExample />
          <div style={{ paddingTop: "72px" }}>
            <div
              className="bodyContainer"
              style={{
                background: `url(${require("../assets/orderbg.jpg")}) rgba(0,0,0,0.4)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
              }}
            >
              <div
                style={{
                  margin: "1rem"
                }}
              >
                <div className="bodyContainerPadd">
                  <div className="foodContainer pt-2 pb-2">
                    {foodItems.map((item, key) => {
                      return (
                        <Card
                          onMouseEnter={() => this.onhover(key)}
                          onMouseLeave={this.onLeave}
                          style={{
                            background: `url(${item.image})`,
                            backgroundSize: "cover",
                            borderRadius: "0px"
                          }}
                          key={key}
                          className="foodCard"
                        >
                          <CardBody style={{ padding: 0 }}>
                            <div
                              className={classnames("hoverView", {
                                hoverViewOnHover:
                                  this.state.hoverClass &&
                                  this.state.key == key,
                                hoverView: !this.state.hoverClass
                              })}
                            >
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "4fr 2fr",
                                  alignItems: "center"
                                }}
                              >
                                <div style={{ paddingRight: "4px" }}>
                                  <span className="foodName">
                                    {item.name
                                      .toLowerCase()
                                      .split(" ")
                                      .map(
                                        s =>
                                          s.charAt(0).toUpperCase() +
                                          s.substring(1)
                                      )
                                      .join(" ")}
                                  </span>
                                  <span className="foodName d-block">
                                    {item.area
                                      .toLowerCase()
                                      .split(" ")
                                      .map(
                                        s =>
                                          s.charAt(0).toUpperCase() +
                                          s.substring(1)
                                      )
                                      .join(" ")}
                                  </span>
                                </div>
                                <Link to={`/resturant/${item.name}`}>
                                  <button
                                    className="customizeBtn"
                                    style={{ width: "100%" }}
                                  >
                                    {"Visit"}
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      contents = (
        <div style={{ width: "100%" }}>
          <NavExample />
          <div
            className="foodContainer"
            style={{
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
              gridTemplateColumns: "auto"
            }}
          >
            <img
              style={{ width: "50px" }}
              src={require("../assets/loading.svg")}
              alt=""
            />
          </div>
        </div>
      );
    }

    return contents;
  }
}

ResturantsPage.propTypes = {
  addToCart: PropTypes.func.isRequired,
  getFoodItems: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    firebase: state.firebase,
    restaurants: state.firestore.ordered.restaurants
  };
};

export default compose(
  connect(
    mapStateToProps,
    { addToCart, getFoodItems }
  ),
  firestoreConnect([
    {
      collection: "restaurants",
      storeAs: "restaurants"
    }
  ])
)(withRouter(ResturantsPage));
