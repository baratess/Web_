﻿import { useState } from "react";
import "./Slider.css";
import SliderItem from "./SliderItem";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((e) => (e + 1) % 3);
  };
  const prevSlide = () => {
    setCurrentSlide((e) => (e + 2) % 3);
  };

  return (
    <section className="slider">
      <div className="slider-elements">
        {currentSlide === 0 && <SliderItem imageSrc="img/fishing.jpg" />}
        {currentSlide === 1 && <SliderItem imageSrc="img/camp.jpg" />}
        {currentSlide === 2 && <SliderItem imageSrc="img/football.jpeg" />}

        <div className="slider-buttons">
          <button onClick={prevSlide}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button onClick={nextSlide}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="slider-dots">
          <button
            className={`slider-dot ${currentSlide === 0 ? "active" : ""}`}
            onClick={() => setCurrentSlide(0)}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlide === 1 ? "active" : ""}`}
            onClick={() => setCurrentSlide(1)}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlide === 2 ? "active" : ""}`}
            onClick={() => setCurrentSlide(2)}
          >
            <span></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;
