import React, { Component } from "react";

export default class AboutUs extends Component {
  render() {
    return (
      <div className="footer">
        <div className="div2">
          <img src={require("../assets/social/google-play-badge.png")} alt="" />
        </div>
        <div className="div1">
          <img src={require("../assets/social/facebook.svg")} alt="" />
          <img src={require("../assets/social/instagram.svg")} alt="" />
          <img src={require("../assets/social/twitter.svg")} alt="" />
          <img src={require("../assets/social/github.svg")} alt="" />
          <img src={require("../assets/social/linkedin.svg")} alt="" />
          <img src={require("../assets/social/whatsapp.svg")} alt="" />
        </div>
      </div>
    );
  }
}
