import React, { Component } from "react";
import { Card, CardBody, Button } from "shards-react";
import { Form, FormGroup, FormInput } from "shards-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToCart } from "../actions/cartActions";
import { getFoodItems } from "../actions/foodActions";
import { withRouter } from "react-router-dom";
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

class ResturantFoodPage extends Component {
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
    let item = this.props.foods.filter(function(it) {
      return it.id === key;
    });
    this.setState({
      showKey: key,
      showdetails: true,
      showItem: item
    });
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

    console.log(this.props.match.params.oid);

    this.props.getFoodItems();
  }

  render() {
    const foodItems = this.props.foods;

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
                  <div className="category">
                    <h3>{this.props.match.params.oid}</h3>
                  </div>
                  <div className="foodContainer">
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
                                  <span className="foodName d-block">
                                    {item.res
                                      .toLowerCase()
                                      .split(" ")
                                      .map(
                                        s =>
                                          s.charAt(0).toUpperCase() +
                                          s.substring(1)
                                      )
                                      .join(" ")}
                                  </span>
                                  <span className="foodName">{item.name}</span>
                                  <span className="foodName">
                                    {" - " + item.price + " Tk"}
                                  </span>
                                  <span className="foodName foodrating d-block">
                                    <Rater
                                      total={5}
                                      rating={
                                        item.rating && item.rating > 0
                                          ? parseInt(item.rating / 2)
                                          : 0
                                      }
                                      interactive={false}
                                    />
                                  </span>
                                </div>

                                <button
                                  onClick={() => this.onClick(item.id)}
                                  className="customizeBtn"
                                >
                                  {"Details"}
                                </button>
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
          <div
            className={classnames("dv", {
              dvShow: this.state.showdetails
            })}
          >
            {this.state.showItem[0] ? (
              <div style={{ padding: "1rem" }}>
                <i
                  className="fas fa-times-circle d-block"
                  style={{ textAlign: "right", fontSize: "22px" }}
                  onClick={this.onClose}
                ></i>
                <div className="mt-2">
                  <h3>{this.state.showItem[0].name}</h3>
                  <img
                    src={this.state.showItem[0].image}
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover"
                    }}
                    alt=""
                  />
                  <span className="d-block mt-1">
                    <b>Description: </b>
                    {" " + this.state.showItem[0].description}
                  </span>
                  <span className="d-block mt-1">
                    <b>Ingredients: </b>
                    {" " + this.state.showItem[0].ingredients}
                  </span>
                  <span className="d-block mt-1">
                    <b>Calories: </b>
                    {" " + this.state.showItem[0].calorie + " kcal"}
                  </span>
                </div>
                <div>
                  <button className="btn-confirm">Customize</button>
                  <button
                    onClick={() => this.addToCart(this.state.showItem[0].id)}
                    className="btn-confirm"
                    style={{ background: "#b00" }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
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

ResturantFoodPage.propTypes = {
  addToCart: PropTypes.func.isRequired,
  getFoodItems: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    firebase: state.firebase,
    foods: state.firestore.ordered.resfood
  };
};

export default compose(
  connect(
    mapStateToProps,
    { addToCart, getFoodItems }
  ),
  firestoreConnect(props => [
    {
      collection: "foods",
      where: [
        ["res", "==", props.match.params.oid ? props.match.params.oid : ""]
      ],
      storeAs: "resfood"
    }
  ])
)(withRouter(ResturantFoodPage));
