import React, { useState, useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

export default function HeadNav() {
  const titles = [
    "استمتع بعرض فرش البيت بسعر يبدأ من 90 ألف فقط",
    "استمتع ب 12 شهر تقسيط",
    "تقسيط علي 6 شهور بدون فوائد",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(goToNextTitle, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setShowTitle(false);
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const goToNextTitle = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === titles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousTitle = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? titles.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full bg-yellow-400 p-3 flex items-center justify-between text-white z-50 overflow-x-hidden">

    
      <button
        onClick={goToPreviousTitle}
        className="text-3xl md:text-4xl text-black flex-shrink-0"
        aria-label="Previous Title"
      >
        <BsArrowLeftCircle />
      </button>

    
      <div className="flex-grow flex items-center justify-center mx-2 min-w-0">
        <h2
          key={currentIndex}
          className={`
            text-center text-black
            transition-transform duration-500 ease-out opacity-100
            ${showTitle ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            text-base sm:text-lg md:text-xl
            whitespace-normal
            break-words
          `}
          style={{ wordBreak: 'break-word' }}
        >
          {titles[currentIndex]}
        </h2>
      </div>

    
      <button
        onClick={goToNextTitle}
        className="text-3xl md:text-4xl text-black flex-shrink-0"
        aria-label="Next Title"
      >
        <BsArrowRightCircle />
      </button>
    </div>
  );
}
