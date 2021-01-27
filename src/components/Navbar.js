import React from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse,
} from "shards-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import Cart from "./Cart";

class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleHoverDown = this.toggleHoverDown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
      hoverDownOpen: false,
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen,
      },
    });
  }

  toggleHoverDown() {
    this.setState({
      ...this.state,
      ...{
        hoverDownOpen: !this.state.hoverDownOpen,
      },
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen,
      },
    });
  }

  onLogout() {
    this.props.logoutUser(this.props.history);
  }

  render() {
    let dropdownContents;
    if (this.props.auth.isAuthenticated) {
      dropdownContents = (
        <Dropdown open={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle nav caret>
            Profile
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-right">
            <Link to="/profile">
              <DropdownItem>Edit</DropdownItem>
            </Link>
            <DropdownItem onClick={this.onLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    } else {
      dropdownContents = (
        <Dropdown open={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle nav caret>
            User
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-right">
            <Link to="/login">
              <DropdownItem>Login</DropdownItem>
            </Link>
            <Link to="/signup">
              <DropdownItem>Signup</DropdownItem>
            </Link>{" "}
          </DropdownMenu>
        </Dropdown>
      );
    }
    return (
      <Navbar
        className="fixed-top"
        type="light"
        style={{ background: "#FFF", color: "black", minHeight: "72px" }}
        expand="md"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link className="navbar-brand" to="/">
            Ahaar
          </Link>
          {this.props.auth.isAuthenticated ? <Cart /> : ""}
        </div>

        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse
          open={this.state.collapseOpen}
          style={{ justifyContent: "flex-end" }}
          navbar
        >
          <Nav navbar>
            <NavItem>
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/shop" className="nav-link active">
                Shop
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/resturants" className="nav-link active">
                Resturants
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/order" className="nav-link active">
                Order
              </Link>
            </NavItem>
          </Nav>
          {dropdownContents}
        </Collapse>
      </Navbar>
    );
  }
}

NavExample.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  firebase: state.firebase,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavExample));
