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
    
    <div className=" w-full bg-yellow-400 p-3 flex items-center justify-center gap-5 text-white z-50 ">

      <button
        onClick={goToPreviousTitle}
        className="text-3xl md:text-4xl text-black"
        aria-label="Previous Title"
      >
        <BsArrowLeftCircle />
      </button>

      
      <div className="relative flex-grow flex items-center justify-center"> 
        <h2
        
          key={currentIndex}
          className={`
            text-sm md:text-lg lg:text-xl  text-center absolute w-full text-black
            transition-transform duration-500 ease-out opacity-100
            ${showTitle ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          `}
        >
          {titles[currentIndex]}
        </h2>
      </div>

      <button
        onClick={goToNextTitle}
        className="text-3xl md:text-4xl text-black"
        aria-label="Next Title"
      >
        <BsArrowRightCircle />
      </button>
    </div>
  );
}