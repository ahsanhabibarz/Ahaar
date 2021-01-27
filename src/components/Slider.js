import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

export default class Slider extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item
          style={{
            background: `url(${require("../assets/bg_3.jpg")}) rgba(0,0,0,0.4)`,
            backgroundBlendMode: "multiply",
            backgroundSize: "cover"
          }}
        >
          <div className="sliderDiv">
            <div className="sliderTitle">
              <h3 style={{ color: "white" }}>
                WE COOKED YOUR DESIRED FOOD RECIPE
              </h3>
              <p>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia.
              </p>
            </div>

            <img src={require("../assets/bg_1.png")} alt="" />
          </div>
        </Carousel.Item>
        <Carousel.Item
          style={{
            background: `url(${require("../assets/burgerbg.jpg")}) rgba(0,0,0,0.5)`,
            backgroundBlendMode: "multiply",
            backgroundSize: "cover"
          }}
        >
          <div
            className="sliderDiv"
            style={{ gridTemplateColumns: "auto", textAlign: "left" }}
          >
            <div className="sliderTitle">
              <h3 style={{ color: "white" }}>
                WE COOKED YOUR DESIRED FOOD RECIPE
              </h3>
              <p>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia.
              </p>
              <button className="seeMore">Visit Store</button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item
          style={{
            background: `url(${require("../assets/recipebg.jpg")}) rgba(0,0,0,0.5)`,
            backgroundBlendMode: "multiply",
            backgroundSize: "cover"
          }}
        >
          <div className="sliderDiv" style={{ gridTemplateColumns: "auto" }}>
            <div className="sliderTitle">
              <h3 style={{ color: "white" }}>
                WE COOKED YOUR DESIRED FOOD RECIPE
              </h3>
              <p>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia.
              </p>
              <button className="seeMore">See more</button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    );
  }
}
