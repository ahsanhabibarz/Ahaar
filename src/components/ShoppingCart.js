import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCartItems,
  removeCartItem,
  placeOrder
} from "../actions/cartActions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import NavExample from "./Navbar";
import classnames from "classnames";
import {
  FormRadio,
  Progress,
  Form,
  FormGroup,
  FormInput,
  FormTextare
} from "shards-react";
import CanvasJSReact from "../assets/canvas/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      spice: "Medium Spicy",
      addons: "",
      totalPrice: 0,
      totalCal: 0,
      totalQuan: 0,
      address: "",
      selectedPaymentMethod: null
    };
    this.addQuantity = this.addQuantity.bind(this);
    this.onChangeSpice = this.onChangeSpice.bind(this);
    this.onChangeAddons = this.onChangeAddons.bind(this);
    this.onAddAddons = this.onAddAddons.bind(this);
    this.addAddonItem = this.addAddonItem.bind(this);
    this.removeAddonItem = this.removeAddonItem.bind(this);
    this.changeFruit = this.changeFruit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onClose = this.onClose.bind(this);
    // this.onhover = this.onhover.bind(this);
    // this.onLeave = this.onLeave.bind(this);
    // this.addToCart = this.addToCart.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
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

  addAddonItem(orderKey, addonKey, e) {
    var foundIndex = this.state.order[orderKey];
    foundIndex.addons[addonKey].quantity =
      foundIndex.addons[addonKey].quantity + 1;

    let price = 0;
    let calorie = 0;
    let addonPrice = 0;
    let addonCalorie = 0;
    this.state.order.map((i, l) => {
      price = price + i.price * i.quantity;
      calorie = calorie + i.calorie * i.quantity;
      i.addons.map((l, m) => {
        price = price + l.price * l.quantity;
        calorie = calorie + l.calorie * l.quantity;
      });
    });

    foundIndex.addons.map((k, g) => {
      addonCalorie = addonCalorie + k.calorie * k.quantity;
      addonPrice = addonPrice + k.price * k.quantity;
    });

    foundIndex.tp = foundIndex.price * foundIndex.quantity + addonPrice;
    foundIndex.tc = foundIndex.calorie * foundIndex.quantity + addonCalorie;

    this.setState({ totalPrice: price, totalCal: calorie });
  }

  removeAddonItem(orderKey, addonKey, e) {
    console.log("Helo");

    var foundIndex = this.state.order[orderKey];

    if (foundIndex.addons[addonKey].quantity > 1) {
      foundIndex.addons[addonKey].quantity =
        foundIndex.addons[addonKey].quantity - 1;

      let price = 0;
      let calorie = 0;
      let addonPrice = 0;
      let addonCalorie = 0;
      this.state.order.map((i, l) => {
        price = price + i.price * i.quantity;
        calorie = calorie + i.calorie * i.quantity;
        i.addons.map((l, m) => {
          price = price + l.price * l.quantity;
          calorie = calorie + l.calorie * l.quantity;
        });
      });

      foundIndex.addons.map((k, g) => {
        addonCalorie = addonCalorie + k.calorie * k.quantity;
        addonPrice = addonPrice + k.price * k.quantity;
      });

      foundIndex.tp = foundIndex.price * foundIndex.quantity + addonPrice;
      foundIndex.tc = foundIndex.calorie * foundIndex.quantity + addonCalorie;

      this.setState({ totalPrice: price, totalCal: calorie });
    } else if (foundIndex.addons[addonKey].quantity == 1) {
      foundIndex.addons[addonKey].quantity =
        foundIndex.addons[addonKey].quantity - 1;
      let price = 0;
      let calorie = 0;
      let addonPrice = 0;
      let addonCalorie = 0;
      this.state.order.map((i, l) => {
        price = price + i.price * i.quantity;
        calorie = calorie + i.calorie * i.quantity;
        i.addons.map((l, m) => {
          price = price + l.price * l.quantity;
          calorie = calorie + l.calorie * l.quantity;
        });
      });
      foundIndex.addons.map((k, g) => {
        addonCalorie = addonCalorie + k.calorie * k.quantity;
        addonPrice = addonPrice + k.price * k.quantity;
      });

      foundIndex.tp = foundIndex.price * foundIndex.quantity + addonPrice;
      foundIndex.tc = foundIndex.calorie * foundIndex.quantity + addonCalorie;
      this.setState({ totalPrice: price, totalCal: calorie });
      let temp = foundIndex.addons;
      temp.splice(addonKey, 1);
      console.log(this.state);
    }
  }

  placeOrder(e) {
    console.log(this.state);

    let random = Math.random()
      .toString(36)
      .substring(7);
    const orderData = {
      uid: this.props.auth.user.uid,
      order: this.state.order,
      price: this.state.totalPrice,
      quantity: this.state.totalQuan,
      calorie: this.state.totalCal,
      address:
        this.state.address !== ""
          ? this.state.address
          : this.props.auth.data.address,
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
      calorie: parseInt(item[2], 10),
      quantity: 1
    };
    if (key == item[3]) {
      var foundIndex = this.state.order[key];
      foundIndex.addons.push(addons);
      this.setState({ order: this.state.order });
      let price = 0;
      let calorie = 0;
      let addonPrice = 0;
      let addonCalorie = 0;
      this.state.order.map((i, g) => {
        price = price + i.price * i.quantity;
        calorie = calorie + i.calorie * i.quantity;
        i.addons.map((l, m) => {
          price = price + l.price * l.quantity;
          calorie = calorie + l.calorie * l.quantity;
        });
      });

      foundIndex.addons.map((k, g) => {
        addonCalorie = addonCalorie + k.calorie * k.quantity;
        addonPrice = addonPrice + k.price * k.quantity;
      });

      foundIndex.tp = foundIndex.price * foundIndex.quantity + addonPrice;
      foundIndex.tc = foundIndex.calorie * foundIndex.quantity + addonCalorie;

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
    this.state.order.map((i, p) => {
      price = price + i.price * i.quantity;
      calorie = calorie + i.calorie * i.quantity;
      quantity = quantity + i.quantity;

      i.addons.map((l, m) => {
        price = price + l.price * l.quantity;
        calorie = calorie + l.calorie * l.quantity;
      });
    });

    this.setState({ order: this.state.order });

    this.setState({
      totalPrice: price,
      totalCal: calorie,
      totalQuan: quantity
    });
  }

  onClose(key) {
    var foundIndex = this.state.order[key];

    if (foundIndex.quantity > 1) {
      foundIndex.quantity = foundIndex.quantity - 1;
      this.setState({ order: this.state.order });

      let price = 0;
      let calorie = 0;
      let quantity = 0;
      this.state.order.map((i, p) => {
        price = price + i.price * i.quantity;
        calorie = calorie + i.calorie * i.quantity;
        quantity = quantity + i.quantity;

        i.addons.map((l, m) => {
          price = price + l.price * l.quantity;
          calorie = calorie + l.calorie * l.quantity;
        });
      });

      this.setState({ order: this.state.order });

      this.setState({
        totalPrice: price,
        totalCal: calorie,
        totalQuan: quantity
      });
    } else {
      this.props.removeCartItem(foundIndex.id, this.props.auth.user.uid);
      let temp = this.state.order;
      temp.splice(key, 1);
      this.setState({ order: temp });
      console.log(this.state);
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCartItems(this.props.auth.user.uid);
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

        i.addons.map((l, m) => {
          price = price + l.price * l.quanitty;
          calorie = calorie + l.calorie * l.quanitty;
        });
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

    let addons = [
      {
        name: "Cheese",
        price: 50,
        calorie: 100
      },
      {
        name: "BBQ Sauce",
        price: 20,
        calorie: 50
      }
    ];

    if (this.state.order.length > 0) {
      contents = (
        <div style={{ width: "100%" }}>
          <NavExample />
          <div className="cartContainer" style={{ paddingTop: "72px" }}>
            {this.state.order.map((i, k) => (
              <div className="shoppingCartDiv" key={k}>
                <div className="div1">
                  <h3>{i.name}</h3>
                  <img src={i.image} className="cartImg" alt="" />
                  <span className="d-block mt-1">
                    <b>Description: </b>
                    {" " + i.description}
                  </span>
                  <span className="d-block mt-1">
                    <b>Meal Time : </b>
                    {" " + i.section}
                  </span>
                  <span className="d-block mt-1">
                    <b>Category: </b>
                    {" " + i.category}
                  </span>
                </div>

                <div className="div2">
                  <div>
                    <span className="d-block mt-1">
                      <b className="d-block">Calorie Analysis</b>
                      <div className="myTable">
                        <div>
                          <span>
                            <b>Ingredients</b>
                          </span>
                          <span>
                            <b>Calorie</b>
                          </span>
                        </div>
                        {i.ingredients.split(",").map((h, k) => (
                          <div>
                            <span>{h.match(/[a-zA-Z]/g)}</span>
                            <span>{h.match(/[0-9]/g)}</span>
                          </div>
                        ))}
                      </div>
                    </span>
                  </div>
                  <div className="p-0 d-block">
                    <h3>Order Details</h3>
                    <span className="d-block">
                      <b>Ordered From: </b>
                      {" " + this.state.order[k].res}
                    </span>
                    <span className="d-block">
                      <b>Quantity : </b>
                      {" " + this.state.order[k].quantity}
                    </span>

                    <span className="d-block">
                      <b>Price : </b>
                      {i.price * i.quantity}
                    </span>
                    <span className="d-block">
                      <b>Caloires : </b>
                      {i.calorie * i.quantity + " kcal"}
                    </span>
                    <span className="d-block">
                      <b>Spice : </b>
                      {i.spice}
                    </span>
                  </div>

                  <div className="p-0 d-block">
                    <h4 className="d-block bold mt-3">Addons</h4>
                    {i.addons && i.addons.length > 0 ? (
                      i.addons.map((l, m) => (
                        <div className="addonQuanCon">
                          <span className="d-block">
                            {m +
                              1 +
                              ".  " +
                              l.name +
                              " " +
                              l.price +
                              " Tk " +
                              l.calorie +
                              " kcal"}
                          </span>
                          <div>
                            <button
                              className="smbtn"
                              onClick={e => this.addAddonItem(k, m, e)}
                            >
                              +
                            </button>
                            <span className="addonQuan">{l.quantity}</span>
                            <button
                              className="smbtn"
                              onClick={e => this.removeAddonItem(k, m, e)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="d-block">No Addons</span>
                    )}
                  </div>
                </div>

                <div className="div3">
                  <div>
                    <h3>Customize</h3>
                    <div
                      style={{
                        display: "grid",
                        gap: "1rem",
                        gridTemplateColumns: "1fr 1fr"
                      }}
                      className="p-0"
                    >
                      <button
                        onClick={() => this.addQuantity(k)}
                        className="myfontawesome"
                      >
                        Add More
                      </button>
                      <button
                        className="myfontawesome"
                        onClick={() => this.onClose(k)}
                      >
                        Remove Item
                      </button>
                    </div>

                    <label htmlFor="Medicine" className="d-block">
                      Spice
                    </label>
                    <select
                      id="feInputCity"
                      defaultValue={"Default"}
                      className="form-control"
                      name="spice"
                      onChange={e => this.onChangeSpice(k, e)}
                    >
                      <option>{i.spice}</option>
                      <option>{"Medium Spicy"}</option>
                      <option>{"Mild Spicy"}</option>
                      <option>{"Spicy"}</option>
                      <option>{"Very Spicy"}</option>
                      <option>{"Extreme Spicy"}</option>
                    </select>

                    <label htmlFor="Medicine" className="d-block mt-3">
                      Addons
                    </label>
                    <select
                      id="feInputCity"
                      defaultValue={"Default"}
                      className="form-control"
                      name="addons"
                      onChange={e => this.onChangeAddons(k, e)}
                    >
                      <option value="Default">Choose here</option>
                      {addons.map((j, k) => (
                        <option value={[j.name, j.price, j.calorie]}>
                          {j.name +
                            " " +
                            j.price +
                            " TK " +
                            " - " +
                            j.calorie +
                            " kcal"}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={e => this.onAddAddons(k, e)}
                      className="myfontawesome"
                    >
                      Apply Addon
                    </button>
                  </div>
                  <div className="p-0 d-block">
                    <span className=" p-0 d-block">
                      Product Cost{" "}
                      <i
                        className="fas fa-circle mr-2 ml-2"
                        style={{ color: "#17C671" }}
                      ></i>
                      Addons Cost{" "}
                      <i
                        className="fas fa-circle ml-2"
                        style={{ color: "#c60002" }}
                      ></i>
                    </span>
                    <span>
                      Price & Caloire Increased For Addons :{" "}
                      {Math.round(((i.tp - i.price) / i.price) * 100) + " %"}
                    </span>
                    <Progress multi>
                      <Progress
                        bar
                        theme="none"
                        value={i.price < 100 ? i.price * 100 : i.price}
                      />
                      <Progress
                        bar
                        theme="success"
                        value={
                          i.price < 100
                            ? (i.tp - i.price) * 100
                            : i.tp - i.price
                        }
                      />
                    </Progress>
                  </div>
                </div>
              </div>
            ))}
            <div className="finalOrderDiv">
              <div className="summeryContainer">
                <h4>Order Summery</h4>
                <div>
                  <span className="bold">Items Name</span>
                  <span className="bold">Quantity</span>
                  <span className="bold">Price</span>
                  <span className="bold">Calorie</span>
                </div>
                {this.state.order.map((o, p) => {
                  return (
                    <div>
                      <span className="">{p + 1 + ".   " + o.name}</span>
                      <span className="">{o.quantity}</span>
                      <span className="">
                        {o.price}
                        {o.tp && o.tp * o.quantity - o.price * o.quantity > 0
                          ? ` +  ${o.tp * o.quantity - o.price * o.quantity}`
                          : ""}
                      </span>
                      <span className="">
                        {o.calorie}
                        {o.tc && o.tc * o.quantity - o.calorie * o.quantity > 0
                          ? ` +  ${o.tc * o.quantity - o.calorie * o.quantity}`
                          : ""}
                      </span>
                    </div>
                  );
                })}
                <div
                  style={{
                    marginTop: "1rem",
                    paddingTop: ".5rem",
                    borderTop: "1px solid black"
                  }}
                >
                  <span className="">Total</span>
                  <span className="">{this.state.totalQuan}</span>
                  <span className="">{this.state.totalPrice}</span>
                  <span className="">{this.state.totalCal}</span>
                </div>
              </div>
              <div className="payemntContainer">
                <div>
                  <label htmlFor="name">Optional Address</label>
                  <FormInput
                    type="text"
                    name="address"
                    onChange={this.onChange}
                    id="address"
                    value={this.state.address}
                  />
                </div>
                <h4 className="mt-2">Payment Method</h4>
                <div>
                  <p className="mb-2">Select your favorite fruit:</p>
                  <FormRadio
                    name="fruit"
                    checked={this.state.selectedPaymentMethod === "bkash"}
                    onChange={() => {
                      this.changeFruit("bkash");
                    }}
                  >
                    Bkash
                  </FormRadio>
                  <FormRadio
                    name="fruit"
                    checked={
                      this.state.selectedPaymentMethod === "cashondelevery"
                    }
                    onChange={() => {
                      this.changeFruit("cashondelevery");
                    }}
                  >
                    Cash on delevery
                  </FormRadio>
                </div>

                <button className="orderFoodbt" onClick={this.placeOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.order.length == 0) {
      contents = (
        <div style={{ width: "100%" }}>
          <NavExample />
          <div
            className="cartContainer"
            style={{ paddingTop: "72px", display: "flex" }}
          >
            <div
              style={{
                margin: "4rem",
                width: "100%",
                background: "white",
                display: "grid",
                alignItems: "center"
              }}
            >
              <h4 style={{ textAlign: "center" }}>Empty Cart</h4>
            </div>
          </div>
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

ShoppingCart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  getFoodItems: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    firebase: state.firebase,
    foods: state.foods
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getCartItems, removeCartItem, placeOrder }
  )
)(withRouter(ShoppingCart));
