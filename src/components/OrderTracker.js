import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCartItems, addRating } from "../actions/cartActions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import NavExample from "./Navbar";
import classnames from "classnames";
import { firestoreConnect } from "react-redux-firebase";
import { FormRadio } from "shards-react";
import { Slider, Collapse } from "shards-react";
import { thisTypeAnnotation } from "@babel/types";
class OrderTracker extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      spice: "Medium Spicy",
      addons: "",
      totalPrice: 0,
      totalCal: 0,
      totalQuan: 0,
      selectedPaymentMethod: null,
      selectedid: "null",
      collapse: false,
      value: 0,
      orderRating: [],
      rateValue: []
    };
    this.addQuantity = this.addQuantity.bind(this);
    this.onChangeSpice = this.onChangeSpice.bind(this);
    this.onChangeAddons = this.onChangeAddons.bind(this);
    this.onAddAddons = this.onAddAddons.bind(this);
    this.changeFruit = this.changeFruit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
    this.onRatingSave = this.onRatingSave.bind(this);
    // this.onClick = this.onClick.bind(this);
    // this.onClose = this.onClose.bind(this);
    // this.onhover = this.onhover.bind(this);
    // this.onLeave = this.onLeave.bind(this);
    // this.addToCart = this.addToCart.bind(this);
  }

  //   onChange(e) {
  //     this.setState({ [e.target.name]: e.target.value });
  //   }
  onChangeSpice(key, e) {
    var foundIndex = this.state.order[key];
    foundIndex.spice = e.target.value;
    this.setState({ order: this.state.order });
    console.log(this.state);
  }

  changeFruit(method) {
    this.setState({
      selectedPaymentMethod: method
    });
  }

  onRatingSave(id, calorie, price) {
    console.log(this.state.orderRating);
    const userdata = {
      rating: this.state.orderRating,
      orderid: id,
      uid: this.props.auth.user.uid,
      calorie: calorie,
      price: price
    };

    if (this.state.orderRating.length > 0) {
      this.props.addRating(userdata);
    }
  }

  toggle(e) {
    console.log(e);
    this.setState({ selectedid: e });
    this.setState({ collapse: !this.state.collapse });
    this.setState({ orderRating: [] });
    console.log(this.state.selectedid);
  }

  handleSlide(e, id) {
    let index = this.state.orderRating.findIndex(i => i.id === id);
    if (index >= 0) {
      this.state.orderRating[index].rate = parseInt(e[0]);
    } else {
      this.state.orderRating.push({ id: id, rate: parseInt(e[0]) });
    }

    console.log(this.state.orderRating);
  }

  placeOrder(e) {
    let random = Math.random()
      .toString(36)
      .substring(7);
    const orderData = {
      uid: this.props.auth.user.uid,
      order: this.state.order,
      price: this.state.totalPrice,
      quantity: this.state.totalQuan,
      calorie: this.state.totalCal,
      address: this.props.auth.data.address,
      status: "Pending",
      orderid: random
    };

    this.props.placeOrder(orderData, this.props.history);
  }

  onChangeAddons(key, e) {
    let addon = e.target.value + "," + key;
    this.setState({ addons: addon });
  }

  onAddAddons(key, e) {
    let item = this.state.addons.split(",");
    let addons = {
      name: item[0],
      price: parseInt(item[1], 10),
      calorie: parseInt(item[2], 10)
    };
    if (key == item[3]) {
      var foundIndex = this.state.order[key];
      foundIndex.addons.push(addons);
      foundIndex.calorie = foundIndex.calorie + parseInt(item[2], 10);
      foundIndex.price = foundIndex.price + parseInt(item[1], 10);
      this.setState({ order: this.state.order });

      let price = 0;
      let calorie = 0;
      this.state.order.map((i, l) => {
        price = price + i.price * i.quantity;
        calorie = calorie + i.calorie * i.quantity;
      });

      this.setState({ totalPrice: price, totalCal: calorie });
    }
    console.log(this.state);
  }

  addQuantity(key) {
    console.log(this.state);
    var foundIndex = this.state.order[key];
    foundIndex.quantity = foundIndex.quantity + 1;
    this.setState({ order: this.state.order });

    let price = 0;
    let calorie = 0;
    let quantity = 0;
    this.state.order.map((i, l) => {
      price = price + i.price * i.quantity;
      calorie = calorie + i.calorie * i.quantity;
      quantity = quantity + i.quantity;
    });

    this.setState({
      totalPrice: price,
      totalCal: calorie,
      totalQuan: quantity
    });
  }

  onClose(key) {
    var foundIndex = this.state.order[key];
    this.props.removeCartItem(foundIndex.id, this.props.auth.user.uid);
    let temp = this.state.order;
    temp.splice(key, 1);
    this.setState({ order: temp });
    console.log(this.state);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCartItems(this.props.auth.user.uid);
    } else {
      this.props.history.push("/login");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({ order: nextProps.foods.cartItems });

      let price = 0;
      let calorie = 0;
      let quantity = 0;
      nextProps.foods.cartItems.map((i, l) => {
        price = price + i.price * i.quantity;
        calorie = calorie + i.calorie * i.quantity;
        quantity = quantity + i.quantity;
      });

      this.setState({
        totalPrice: price,
        totalCal: calorie,
        totalQuan: quantity
      });

      console.log(this.state);
    }
  }

  render() {
    let contents;
    let totalCost = 0;
    let totalCal = 0;

    const foodItems = this.props.orders;

    if (foodItems) {
      contents = (
        <div className="div1">
          {foodItems.map((m, l) => (
            <div className="finalOrderDiv2Padding">
              <div className="finalOrderDiv2">
                <div>
                  <div className="orderItems">
                    <span className="bold">Items Name</span>
                    <span className="bold">Quantity</span>
                    <span className="bold">Price</span>
                    <span className="bold">Calorie</span>
                    <span className="bold">Restaurant</span>
                  </div>
                  {m.order.order.map((o, p) => (
                    <div className="orderItemsInside">
                      <span className="">{p + 1 + ".   " + o.name}</span>
                      <span className="">{o.quantity}</span>
                      <span className="">{o.price}</span>
                      <span className="">{o.calorie}</span>
                      <span className="">{o.res}</span>
                    </div>
                  ))}
                </div>
                <div className="tCenter">
                  <span className="d-block"> Order ID # {m.order.orderid}</span>
                  <span className="d-block">
                    {" "}
                    Total Price : {m.order.price}
                  </span>
                  <span className="d-block">
                    {" "}
                    Total Calorie : {m.order.calorie}
                  </span>
                </div>
                <div>
                  <button className="myfontawesome m-1">
                    {m.order.status}
                  </button>
                  {m.order.status === "Confirmed" ? (
                    <button
                      className="myfontawesome m-1"
                      onClick={() => this.toggle(m.id)}
                    >
                      Rate
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <Collapse
                  open={
                    this.state.selectedid === m.id && this.state.collapse
                      ? true
                      : false
                  }
                >
                  <div className="rateDiv">
                    <div>
                      {m.order.order.map((o, p) => (
                        <div className="ratedivdiv" key={p}>
                          <span>{o.name}</span>
                          <div className="rsliderDiv">
                            <Slider
                              onSlide={e => this.handleSlide(e, o.id)}
                              margin={20}
                              pips={{
                                mode: "steps",
                                stepped: true,
                                density: 10
                              }}
                              connect={[true, false]}
                              start={[0]}
                              range={{ min: 0, max: 10 }}
                              step={1}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="myfontawesome"
                      onClick={() =>
                        this.onRatingSave(m.id, m.order.calorie, m.order.price)
                      }
                    >
                      Save
                    </button>
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      contents = (
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
      );
    }

    return (
      <div style={{ width: "100%" }}>
        <NavExample />
        <div className="cartContainer2" style={{ paddingTop: "72px" }}>
          {contents}
        </div>
      </div>
    );
  }
}

OrderTracker.propTypes = {
  getCartItems: PropTypes.func.isRequired,
  addRating: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    firebase: state.firebase,
    foods: state.foods,
    orders: state.firestore.ordered.orders
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getCartItems, addRating }
  ),
  firestoreConnect(props => [
    {
      collection: "orders",
      where: [
        [
          "order.uid",
          "==",
          props.auth.isAuthenticated ? props.auth.user.uid : ""
        ]
      ]
    }
  ])
)(withRouter(OrderTracker));
