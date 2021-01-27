import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUserData } from "../actions/authActions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import NavExample from "./Navbar";
import { Card, CardBody, Button } from "shards-react";
import { Form, FormGroup, FormInput, FormTextarea } from "shards-react";
import classnames from "classnames";
import { firestoreConnect } from "react-redux-firebase";
import CanvasJSReact from "../assets/canvas/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      pname: "",
      email: "",
      phone: "",
      address: "",
      budget: 0,
      calorie: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    if (this.props.auth.isAuthenticated) {
      const userData = {
        name: this.state.pname,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
        budget: this.state.budget,
        calorie: this.state.calorie,
      };

      this.props.updateUserData(this.props.auth.user.uid, userData);
    }
  }

  componentDidMount() {
    console.log(this.state);

    if (this.props.auth.isAuthenticated) {
      this.props.updateUserData(this.props.auth.user.uid, null);
    } else {
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({
        users: nextProps.user,
      });
      console.log(nextProps);
    }

    if (nextProps.users && nextProps.users[0]) {
      this.setState({
        pname: nextProps.users[0].name,
        email: nextProps.users[0].email,
        phone: nextProps.users[0].phone,
        address: nextProps.users[0].address,
        budget: nextProps.users[0].budget,
        calorie: nextProps.users[0].calorie,
      });
    }
  }

  render() {
    let contents;
    let totalCost = 0;
    let totalCal = 0;
    const options3 = {
      exportEnabled: false,
      animationEnabled: true,
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Weekly Analysis",
      },
      axisY: {
        title: "Foods",
        includeZero: true,
      },
      axisX: {
        title: "Days",
        interval: 1,
      },
      height: 300,
      data: [
        {
          type: "column",
          toolTipContent: "Day {x}: {y}%",
          dataPoints: [
            { label: "Sat", y: 1000 },
            { label: "Sun", y: 1200 },
            { label: "Mon", y: 2500 },
            { label: "Tue", y: 1800 },
            { label: "Wed", y: 1690 },
            { label: "Thu", y: 1350 },
            { label: "Fri", y: 2100 },
          ],
        },
      ],
    };
    const options = {
      exportEnabled: false,
      animationEnabled: true,
      title: {
        text: `Budget Limit : ${
          this.state.users && this.state.users[0] && this.state.users[0].budget
            ? this.state.users[0].budget
            : 0
        }`,
      },
      height: 300,
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}",
          dataPoints: [
            {
              y:
                this.state.users &&
                this.state.users[0] &&
                this.state.users[0].spent
                  ? this.state.users[0].spent
                  : 0,
              label: "Spent",
              color: "#C0504E",
            },
            {
              y:
                this.state.users &&
                this.state.users[0] &&
                this.state.users[0].budget
                  ? this.state.users[0].budget - this.state.users[0].spent
                  : 0,
              label: "Remaining",
              color: "#2E8B57",
            },
          ],
        },
      ],
    };

    const options2 = {
      exportEnabled: false,
      animationEnabled: true,
      title: {
        text: `Calorie Limit : ${
          this.state.users && this.state.users[0] && this.state.users[0].calorie
            ? this.state.users[0].calorie
            : 0
        }`,
      },
      height: 300,
      colorSet: ["#4661EE", "#EC5657", "#1BCDD1"],
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}",
          dataPoints: [
            {
              y:
                this.state.users &&
                this.state.users[0] &&
                this.state.users[0].calorie
                  ? this.state.users[0].calorie - this.state.users[0].consumed
                  : 0,
              label: "Remaining Calorie",
            },
            {
              y:
                this.state.users &&
                this.state.users[0] &&
                this.state.users[0].consumed
                  ? this.state.users[0].consumed
                  : 0,
              label: "Consumed Calorie",
            },
          ],
        },
      ],
    };

    const users = this.props.users;

    if (users && this.props.users[0] && this.state.pname) {
      contents = (
        <div className="div1">
          <div className="profileChartDiv">
            <div className="pieContainer">
              <CanvasJSChart style={{ height: "100px" }} options={options} />
            </div>
            <div className="pieContainer">
              <CanvasJSChart options={options3} />
            </div>
            <div className="pieContainer">
              <CanvasJSChart options={options2} />
            </div>
          </div>
          <div className="profileFormDiv">
            <Form>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <FormInput
                  type="text"
                  onChange={this.onChange}
                  name="pname"
                  defaultValue={this.state.pname}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="email">Email</label>
                <FormInput
                  type="email"
                  onChange={this.onChange}
                  name="email"
                  id="email"
                  defaultValue={this.props.users[0].email}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="phone">Phone</label>
                <FormInput
                  type="tel"
                  onChange={this.onChange}
                  name="phone"
                  id="phone"
                  defaultValue={this.props.users[0].phone}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="phone">Address</label>
                <FormInput
                  type="text"
                  onChange={this.onChange}
                  name="address"
                  id="address"
                  defaultValue={this.props.users[0].address}
                />
              </FormGroup>
              <div className="signUpGrid">
                <FormGroup>
                  <label htmlFor="budget">Monthly Budget</label>
                  <FormInput
                    type="number"
                    onChange={this.onChange}
                    name="budget"
                    id="budget"
                    defaultValue={this.props.users[0].budget}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="calorie">Daily Calorie</label>
                  <FormInput
                    type="number"
                    onChange={this.onChange}
                    name="calorie"
                    id="calorie"
                    defaultValue={this.props.users[0].calorie}
                  />
                </FormGroup>
              </div>
              <FormGroup className="mt-2">
                <Button theme="primary" onClick={this.onSubmit}>
                  Update Profile
                </Button>
              </FormGroup>
            </Form>
          </div>
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
            gridTemplateColumns: "auto",
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

Profile.propTypes = {
  updateUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    firebase: state.firebase,
    users: state.firestore.ordered.user,
  };
};

export default compose(
  connect(mapStateToProps, { updateUserData }),
  firestoreConnect((props) => [
    {
      collection: "users",
      storeAs: "user",
      where: [
        ["uid", "==", props.auth.isAuthenticated ? props.auth.user.uid : ""],
      ],
    },
  ])
)(withRouter(Profile));
