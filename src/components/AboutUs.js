import React, { Component } from "react";

export default class AboutUs extends Component {
  render() {
    return (
      <div className="aboutUs">
        <div>
          <img src={require("../assets/resturant.svg")} alt="" />
          <h4 className="black">Restaurant</h4>
          <p>
            We deliver your favorite meals from popular restaurants that are
            near your delivery location
          </p>
        </div>
        <div>
          <img src={require("../assets/pizza.svg")} alt="" />
          <h4 className="black">Ready Meals</h4>
          <p>
            The option to select ready meals allows you to order food without
            the hassle of cooking!
          </p>
        </div>
        <div>
          <img src={require("../assets/Ingredients.svg")} alt="" />
          <h4 className="black">Ingredients</h4>
          <p>
            We deliver your favorite meals from popular restaurants that are
            near your delivery location
          </p>
        </div>
        <div>
          <img src={require("../assets/recipe2.svg")} alt="" />
          <h4 className="black">Recipe With Ingredients</h4>
          <p>
            We deliver your favorite meals from popular restaurants that are
            near your delivery location
          </p>
        </div>
        <div>
          <img
            src={require("../assets/chef.svg")}
            alt=""
            style={{ width: "45px" }}
          />
          <h4 className="black">Courses</h4>
          <p>
            We deliver your favorite meals from popular restaurants that are
            near your delivery location
          </p>
        </div>
        <div>
          <img
            src={require("../assets/about.svg")}
            alt=""
            style={{ width: "30px" }}
          />
          <h4 className="black">About Us</h4>
          <p>
            Our goal is to deliver food to you in whichever form you want it and
            encourage you to try being a chef in your kitchen!
          </p>
        </div>
      </div>
    );
  }
}
