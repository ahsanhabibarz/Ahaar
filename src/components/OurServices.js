import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

export default class OurServices extends Component {
  render() {
    return (
      <div className="ourServices">
        <div>
          <h3>Our Services</h3>
          <span>
            {" "}
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </span>
        </div>
        <div className="div2">
          <div>
            <img src={require("../assets/salad.svg")} alt="" />
            <h4>Healthy Food</h4>
            <span>
              Even the all-powerful Pointing has no control about the blind
              texts it is an almost unorthographic
            </span>
          </div>
          <div>
            <img src={require("../assets/scooter.svg")} alt="" />
            <h4>Fastest Delivery</h4>
            <span>
              Even the all-powerful Pointing has no control about the blind
              texts it is an almost unorthographic
            </span>
          </div>
          <div>
            <img src={require("../assets/pizza.svg")} alt="" />
            <h4>Original Recipes</h4>
            <span>
              Even the all-powerful Pointing has no control about the blind
              texts it is an almost unorthographic
            </span>
          </div>
        </div>
      </div>
    );
  }
}
