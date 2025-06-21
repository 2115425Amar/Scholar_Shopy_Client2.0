import React, { useState, useEffect, useRef } from "react";
import gif from "./Banner.mp4";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [gif, gif]; // Add more video paths if needed
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000); // auto slide every 5 seconds
    return () => clearTimeout(timeoutRef.current);
  }, [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((videoSrc, index) => (
          <video
            key={index}
            className="min-w-full h-[290px] object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
          />
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800 z-10"
      >
        ❮
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800 z-10"
      >
        ❯
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full ${idx === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;