import React, { Component } from "react";
import { Card, CardBody, Button } from "shards-react";
import { Form, FormGroup, FormInput } from "shards-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signupUser } from "../actions/authActions";
import { Link, withRouter } from "react-router-dom";
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      budget: "",
      calorie: "",
      password: "",
      address: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      phone: this.state.phone,
      budget: this.state.budget,
      calorie: this.state.calorie,
      address: this.state.address
    };
    this.props.signupUser(userData, this.props.history);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="signupContainer">
        <div className="signupDivContainer">
          <div className="welcomeDiv2">
            <img className="logo" src={require("../assets/logo.svg")} alt="" />
            <h3>Welcome to Ahaar</h3>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              obcaecati doloribus quo cupiditate. Odit porro vero neque dolore
              itaque doloremque quas incidunt ea, amet odio sunt ullam, quos
              voluptatibus nesciunt.
            </span>
          </div>
          <div className="formDiv2">
            <Form>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <FormInput
                  type="text"
                  onChange={this.onChange}
                  name="name"
                  id="name"
                />
              </FormGroup>
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
                <label htmlFor="phone">Phone</label>
                <FormInput
                  type="tel"
                  onChange={this.onChange}
                  name="phone"
                  id="phone"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="phone">Address</label>
                <FormInput
                  type="text"
                  onChange={this.onChange}
                  name="address"
                  id="address"
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
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="calorie">Daily Calorie</label>
                  <FormInput
                    type="number"
                    onChange={this.onChange}
                    name="calorie"
                    id="calorie"
                  />
                </FormGroup>
              </div>
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
                  Sign Up
                </Button>
              </FormGroup>
            </Form>
            <span>Already have an account ?</span>{" "}
            <Link to="/login">
              {" "}
              <span> Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  firebase: state.firebase
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withRouter(Signup));
