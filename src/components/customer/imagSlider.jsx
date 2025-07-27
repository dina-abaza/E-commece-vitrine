import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/kanapa2.jpg",
    title: "قسط علي 6 شهور",
    text: (
      <>
        <span className="text-yellow-400">0%</span>
        <span className="text-blue-950"> مقدم</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-blue-950"> فوائد</span>
      </>
    ),
    service: "توصيل مجاني",
    button: "تسوق الان",
  },
  {
    image: "/master-1-1.jpg",
    title: "قسط علي 12 شهر",
    text: (
      <>
        <span className="text-yellow-400">25%</span>
        <span className="text-blue-950"> مقدم</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-blue-950"> فوائد</span>
      </>
    ),
    service: "توصيل مجاني",
    button: "تسوق الان",
  },
  {
    image: "/sofa4-2.jpg",
    title: "قسط مع فرصة",
    text: (
      <>
        <span className="text-yellow-400">  اثني عشر شهر</span>
        <span className="text-blue-950">  تقسيط</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-blue-950"> فوائد</span>
      </>
    ),
    service: "توصيل مجاني",
    button: "تسوق الان",
  },
  {
    image: "/salon.jpg",
    title: "قسط مع موجو",
    text: (
      <>
        <span className="text-yellow-400">ستة</span>
        <span className="text-blue-950"> اشهر تقسيط</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-blue-950"> فوائد</span>
      </>
    ),
    service: "توصيل مجاني",
    button: "تسوق الان",
  },
  {
    image: "/salon2.jpg",
    title: "قسط مع امان",
    text: (
      <>
        <span className="text-yellow-400">اثني عشر</span>
        <span className="text-blue-950"> شهر تقسيط</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-blue-950"> فوائد</span>
      </>
    ),
    service: "توصيل مجاني",
    button: "تسوق الان",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animate, setAnimate] = useState(true);

  const nextSlide = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setAnimate(true);
    }, 150);
  };

  const prevSlide = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimate(true);
    }, 150);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full max-w-6xl mx-auto py-10 overflow-hidden shadow-xl rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ height: "600px" }}
    >
      <img
        src={slides[current].image}
        alt={slides[current].title}
        className={`w-full h-full object-cover transition-opacity duration-900 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      />

  
      <div
        className="absolute right-5 md:right-20 top-1/3 md:top-1/2 flex flex-col items-end gap-4 text-sm md:text-2xl text-blue-950 font-bold"
      >
        <h2 className="text-lg md:text-4xl">{slides[current].title}</h2>

        <p className="text-base md:text-3xl">{slides[current].text}</p>

        <div className="flex items-center gap-2 text-base md:text-3xl justify-end">
          <p>{slides[current].service}</p>
          <FaTruck className="text-yellow-400 w-6 h-6 md:w-8 md:h-8" />
        </div>

        <Link
          to="/allProducts"
          className="bg-yellow-400 text-blue-900 px-4 py-1 md:px-6 md:py-2 rounded shadow hover:bg-amber-500 transition text-xs md:text-sm"
        >
          {slides[current].button}
        </Link>
      </div>

      
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-3xl text-white hover:text-yellow-400 transition"
        aria-label="السابق"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-3xl text-white hover:text-yellow-400 transition"
        aria-label="التالي"
      >
        ❯
      </button>
    </div>
  );
};

export default ImageSlider;
