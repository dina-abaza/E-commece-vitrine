
import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/fournitre1.jpg",
    title: "قسط علي 6 شهور",
    text: (
      <>
        <span className="text-yellow-400">0%</span>
        <span className="text-white"> مقدم</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-white"> فوائد</span>
      </>
    ),
    service: "توصيل مجاني",
    button: "تسوق الان",
  },
  {
    image: "/fournitre2.jpg",
    title: "قسط علي 12 شهر",
    text: (
      <>
        <span className="text-yellow-400">25%</span>
        <span className="text-white"> مقدم</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-white"> فوائد</span>
      </>
    ),
    service: "توصيل مجاني",
    button: "تسوق الان",
  },
  {
    image: "/fournitre3.jpg",
    title: "قسط مع فرصة",
    text: (
      <>
        <span className="text-yellow-400">  اثني عشر شهر</span>
        <span className="text-white">  تقسيط</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-white"> فوائد</span>
      </>
    ),
    service: "توصيل مجاني",
    button: "تسوق الان",
  },
  {
    image: "/fournitre4.jpg",
    title: "قسط مع موجو",
    text: (
      <>
        <span className="text-yellow-400">ستة</span>
        <span className="text-white"> اشهر تقسيط</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-white"> فوائد</span>
      </>
    ),
    service: "توصيل مجاني",
    button: "تسوق الان",
  },
  {
    image: "/fournitre5.jpg",
    title: "قسط مع امان",
    text: (
      <>
        <span className="text-yellow-400">اثني عشر</span>
        <span className="text-white"> شهر تقسيط</span>
        <br />
        <span className="text-yellow-400">0%</span>
        <span className="text-white"> فوائد</span>
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
      className="relative w-full max-w-6xl mx-auto py-10 overflow-hidden shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`relative w-full h-[500px] transition-all duration-900 transform ${
          animate ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="object-center w-full h-full brightness-100"
        />

        {/* المحتوى الرئيسي: العنوان + النص + التوصيل */}
        <div
          className="
            absolute top-20 right-20
            text-white font-bold
            flex flex-col items-end gap-4
            sm:static sm:items-center sm:text-center sm:gap-2 sm:p-4
          "
        >
          <h2 className="text-4xl sm:text-2xl">{slides[current].title}</h2>

          <p className="text-3xl sm:text-lg">{slides[current].text}</p>

          <div className="flex items-center gap-2 text-3xl sm:text-lg justify-end sm:justify-center">
            <p>{slides[current].service}</p>
            <FaTruck className="text-yellow-400 w-8 h-8" />
          </div>

          {/* زر تسوق الان تحت "توصيل مجاني" */}
          <Link
            to="/allProducts"
            className="
              bg-amber-300 text-blue-950 px-6 py-2 rounded shadow
              hover:bg-amber-400 transition
              sm:px-4 sm:py-1 sm:text-sm
            "
          >
            {slides[current].button}
          </Link>
        </div>
      </div>

      {/* أزرار التنقل */}
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
