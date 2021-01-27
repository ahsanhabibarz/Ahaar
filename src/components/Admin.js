import React, { Component } from "react";
import { Card, CardBody, Button } from "shards-react";
import { Form, FormGroup, FormInput, FormTextarea } from "shards-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loginAdmin,
  addFood,
  confirmOrder,
  getRestaurants
} from "../actions/adminAction";
import { Link, withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CanvasJSReact from "../assets/canvas/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Admin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",
      description: "",
      ingredients: "",
      calorie: "",
      price: "",
      category: "",
      section: "",
      image: "",
      restaurant: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddFood = this.onAddFood.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  confirmOrder(orderid) {
    this.props.confirmOrder(orderid);
  }

  onAddFood(e) {
    if (
      this.state.category !== "" &&
      this.state.section !== "" &&
      this.state.image !== "" &&
      this.state.name !== "" &&
      this.state.calorie !== "" &&
      this.state.price !== "" &&
      this.state.ingredients !== "" &&
      this.state.description !== "" &&
      this.state.restaurant !== ""
    ) {
      let resArray = this.props.admin.restaurants
        .map(function(e) {
          return e.name;
        })
        .indexOf(this.state.restaurant);

      const foodData = {
        name: this.state.name,
        description: this.state.description,
        ingredients: this.state.ingredients,
        restaurant: this.state.restaurant,
        calorie: parseInt(this.state.calorie, 10),
        price: parseInt(this.state.price, 10),
        category: this.state.category,
        section: this.state.section,
        image: this.state.image,
        area: this.props.admin.restaurants[resArray].area
      };

      console.log(foodData);

      this.props.addFood(foodData);

      this.setState({
        name: "",
        description: "",
        ingredients: "",
        calorie: "",
        price: "",
        category: "Homemade",
        section: "Breakfast",
        image: ""
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginAdmin(userData, this.props.history);
  }

  componentDidMount() {
    if (this.props.admin.isAuthenticated) {
      this.props.getRestaurants();
    }
  }

  render() {
    let adminContents;
    let orderContents;
    const options = {
      animationEnabled: true,
      exportEnabled: false,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: "Sale Analysis"
      },
      axisY: {
        title: "Sales",
        includeZero: false,
        suffix: "%"
      },
      axisX: {
        title: "Months",
        prefix: "W",
        interval: 2
      },
      data: [
        {
          type: "line",
          toolTipContent: "Week {x}: {y}%",
          dataPoints: [
            { x: 1, y: 64 },
            { x: 2, y: 61 },
            { x: 3, y: 64 },
            { x: 4, y: 62 },
            { x: 5, y: 64 },
            { x: 6, y: 60 },
            { x: 7, y: 58 },
            { x: 8, y: 59 },
            { x: 9, y: 53 },
            { x: 10, y: 54 },
            { x: 11, y: 61 },
            { x: 12, y: 60 },
            { x: 13, y: 55 },
            { x: 14, y: 60 },
            { x: 15, y: 56 },
            { x: 16, y: 60 },
            { x: 17, y: 59.5 },
            { x: 18, y: 63 },
            { x: 19, y: 58 },
            { x: 20, y: 54 },
            { x: 21, y: 59 },
            { x: 22, y: 64 },
            { x: 23, y: 59 }
          ]
        }
      ]
    };
    const foodItems = this.props.orders;
    if (foodItems) {
      orderContents = (
        <div>
          {foodItems.map((m, l) => (
            <div className="finalOrderDiv3">
              <div>
                <div className="orderItems2">
                  <span className="">
                    <b>Items Name</b>{" "}
                  </span>
                  <span className="">
                    <b>Addons</b>{" "}
                  </span>
                  <span className="">
                    <b>Quantity</b>{" "}
                  </span>
                  <span className="">
                    <b>Price</b>
                  </span>
                  <span className="">
                    <b>Restaurant</b>
                  </span>
                </div>
                {m.order.order.map((o, p) => (
                  <div className="orderItemsInside2">
                    <span className="">{p + 1 + ".   " + o.name}</span>
                    <span>
                      {o.addons.length > 0
                        ? o.addons.map((k, m) => (
                            <span className="d-block">
                              {k.quantity + "  " + k.name}
                            </span>
                          ))
                        : "none"}
                    </span>
                    <span className="">{o.quantity}</span>
                    <span className="">{o.price}</span>
                    <span className="">{o.res}</span>
                  </div>
                ))}
              </div>
              <div className="tCenter">
                <span className="d-block"> Order ID # {m.order.orderid}</span>
                <span className="d-block"> Total Price : {m.order.price}</span>
                <span className="d-block">
                  {" "}
                  Total Calorie : {m.order.calorie}
                </span>
              </div>
              <div className="tCenter">
                <span className="d-block">
                  {" "}
                  <b>Delivery Address</b>
                </span>
                <span className="d-block"> {m.order.address}</span>
              </div>
              <div>
                <button
                  className="myfontawesome"
                  onClick={() => this.confirmOrder(m.id)}
                >
                  {m.order.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (this.props.admin.isAuthenticated) {
      adminContents = (
        <div className="admin">
          <div className="canDiv">
            <CanvasJSChart options={options} />
          </div>
          <div className="salesInfoContainer">
            <div className="saleInfoAdmin">
              <img src={require("../assets/order.svg")} alt="" />
              <h4>Current Orders</h4>
              <h6>{this.props.orders ? this.props.orders.length : 0}</h6>
            </div>
            <div className="saleInfoAdmin">
              <img src={require("../assets/growth.svg")} alt="" />
              <h4>Mothly Sales</h4>
              <h6>{this.props.orders ? this.props.orders.length : 0}</h6>
            </div>
            <div className="saleInfoAdmin">
              <img src={require("../assets/order.svg")} alt="" />
              <h4>Current Orders</h4>
              <h6>{this.props.orders ? this.props.orders.length : 0}</h6>
            </div>
          </div>
          <div className="adminContainer">
            <div className="orders">{orderContents}</div>
          </div>
          <div className="addFoods">
            <Form>
              <div>
                <FormGroup>
                  <label htmlFor="name">Name</label>
                  <FormInput
                    type="text"
                    onChange={this.onChange}
                    name="name"
                    id="name"
                    value={this.state.name}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="name">Description</label>
                  <FormTextarea
                    type="text"
                    onChange={this.onChange}
                    name="description"
                    id="description"
                    style={{ height: "120px" }}
                    value={this.state.description}
                  />
                </FormGroup>
                <FormGroup
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr"
                  }}
                >
                  <div className="mr-4">
                    <label htmlFor="name">Price</label>
                    <FormInput
                      type="number"
                      onChange={this.onChange}
                      name="price"
                      id="price"
                      value={this.state.price}
                    />
                  </div>
                  <div>
                    <label htmlFor="name">Calorie</label>
                    <FormInput
                      type="number"
                      onChange={this.onChange}
                      name="calorie"
                      id="calorie"
                      value={this.state.calorie}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="name">Restaurant</label>
                  <select
                    id="feInputCity"
                    defaultValue={"Default"}
                    className="form-control"
                    name="restaurant"
                    onChange={this.onChange}
                  >
                    <option>{"Choose"}</option>
                    {this.props.admin.restaurants
                      ? this.props.admin.restaurants.map((m, l) => (
                          <option key={l}>{m.name}</option>
                        ))
                      : ""}
                  </select>
                </FormGroup>
              </div>
              <div>
                <FormGroup>
                  <label htmlFor="name">Category</label>
                  <select
                    id="feInputCity"
                    defaultValue={"Default"}
                    className="form-control"
                    name="category"
                    onChange={this.onChange}
                  >
                    <option>{"Choose"}</option>
                    <option>{"Home Made"}</option>
                    <option>{"Fast Food"}</option>
                    <option>{"Chineese Food"}</option>
                    <option>{"Italian Food"}</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="name">Section</label>
                  <select
                    id="feInputCity"
                    defaultValue={"Default"}
                    className="form-control"
                    name="section"
                    onChange={this.onChange}
                  >
                    <option>{"Choose"}</option>
                    <option>{"Breakfast"}</option>
                    <option>{"Lunch"}</option>
                    <option>{"Dinner"}</option>
                    <option>{"Hot Sales"}</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="name">Ingredients</label>
                  <FormInput
                    type="text"
                    onChange={this.onChange}
                    name="ingredients"
                    id="ingredients"
                    value={this.state.ingredients}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="name">Image Link</label>
                  <FormInput
                    type="text"
                    onChange={this.onChange}
                    name="image"
                    id="image"
                    value={this.state.image}
                  />
                </FormGroup>
              </div>
            </Form>
            <div style={{ textAlign: "right" }}>
              <Button theme="primary" onClick={this.onAddFood}>
                Add Foods
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (!this.props.admin.isAuthenticated) {
      adminContents = (
        <div className="loginContainer">
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <FormInput
                    type="email"
                    onChange={this.onChange}
                    name="email"
                    id="email"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="password">Password</label>
                  <FormInput
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    id="password"
                  />
                </FormGroup>
                <FormGroup>
                  <Button theme="primary" onClick={this.onSubmit}>
                    Login
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      );
    }

    return adminContents;
  }
}

Admin.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  addFood: PropTypes.func.isRequired,
  confirmOrder: PropTypes.func.isRequired,
  getRestaurants: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  firebase: state.firebase,
  orders: state.firestore.ordered.orders
});

export default compose(
  connect(
    mapStateToProps,
    { loginAdmin, addFood, confirmOrder, getRestaurants }
  ),
  firestoreConnect(props => [
    {
      collection: "orders"
    }
  ])
)(withRouter(Admin));
