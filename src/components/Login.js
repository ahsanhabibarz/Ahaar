import React, { Component } from "react";
import { Card, CardBody, Button } from "shards-react";
import { Form, FormGroup, FormInput } from "shards-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authActions";
import { Link, withRouter } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="loginContainer">
        <div className="logindivContainer">
          <div className="welcomeDiv">
            <h3>Welcome to Ahaar</h3>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              obcaecati doloribus quo cupiditate. Odit porro vero neque dolore
              itaque doloremque quas incidunt ea, amet odio sunt ullam, quos
              voluptatibus nesciunt.
            </span>
          </div>
          <div className="formDiv">
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
            <span>Dont have an account ?</span>{" "}
            <Link to="/signup">
              {" "}
              <span> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  firebase: state.firebase
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
