import React, { useEffect, useState } from "react";
import { FaTruck, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const slides = [
  { image: "/kanapa2.jpg", title: "قسط علي 6 شهور", text: (<><span className="text-yellow-400">0</span><span className="text-yellow-400">%</span><span className="text-white"> مقدم</span><br /><span className="text-yellow-400">0</span><span className="text-yellow-400">%</span><span className="text-white"> فوائد</span></>), service: "توصيل مجاني", button: "تسوق الان" },
  { image: "/master-1-1.jpg", title: "قسط علي 12 شهر", text: (<><span className="text-yellow-400">25</span><span className="text-yellow-400">%</span><span className="text-white"> مقدم</span><br /><span className="text-yellow-400">0</span><span className="text-yellow-400">%</span><span className="text-white"> فوائد</span></>), service: "توصيل مجاني", button: "تسوق الان" },
  { image: "/sofa4-2.jpg", title: "قسط مع فرصة", text: (<><span className="text-yellow-400">15</span><span className="text-yellow-400">%</span><span className="text-white"> مقدم</span><br /><span className="text-yellow-400">0</span><span className="text-yellow-400">%</span><span className="text-white"> فوائد</span></>), service: "توصيل مجاني", button: "تسوق الان" },
  { image: "/salon.jpg", title: "قسط مع موجو", text: (<><span className="text-yellow-400">20</span><span className="text-yellow-400">%</span><span className="text-white"> مقدم</span><br /><span className="text-yellow-400">0</span><span className="text-yellow-400">%</span><span className="text-white"> فوائد</span></>), service: "توصيل مجاني", button: "تسوق الان" },
  { image: "/salon2.jpg", title: "قسط مع امان", text: (<><span className="text-yellow-400">18</span><span className="text-yellow-400">%</span><span className="text-white"> مقدم</span><br /><span className="text-yellow-400">0</span><span className="text-yellow-400">%</span><span className="text-white"> فوائد</span></>), service: "توصيل مجاني", button: "تسوق الان" },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, current]);

  return (
    <div
      className="relative w-full max-w-6xl mx-auto md:py-10 overflow-hidden shadow-xl md:rounded-lg group h-[350px] md:h-[600px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* عرض الصور */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          
          {/* المحتوى النصي */}
          <div className={`absolute left-0 right-0 px-8 md:px-20 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2 md:gap-4 text-white font-bold transition-all duration-1000 delay-300 transform ${
            index === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}>
            <h2 className="text-xl md:text-5xl text-right leading-tight">{slide.title}</h2>
            <div className="text-lg md:text-4xl text-right leading-tight">{slide.text}</div>
            <div className="flex items-center gap-2 text-sm md:text-3xl">
              <p>{slide.service}</p>
              <FaTruck className="text-yellow-400 w-5 h-5 md:w-10 md:h-10" />
            </div>
            <Link
              to="/allProducts"
              className="bg-yellow-400 text-blue-900 px-4 py-1.5 md:px-8 md:py-3 rounded-full shadow-lg hover:bg-amber-500 transition-all font-extrabold text-xs md:text-xl mt-2 md:mt-4"
            >
              {slide.button}
            </Link>
          </div>
        </div>
      ))}

      {/* الأسهم - تم تعديلها لتكون أبعد ما يمكن في الموبايل */}
      <button
        onClick={prevSlide}
        className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 bg-black/10 md:bg-white/20 hover:bg-yellow-400 hover:text-blue-900 text-white p-2 md:p-3 rounded-full transition-all z-30"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 bg-black/10 md:bg-white/20 hover:bg-yellow-400 hover:text-blue-900 text-white p-2 md:p-3 rounded-full transition-all z-30"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-4 h-4 md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default ImageSlider;