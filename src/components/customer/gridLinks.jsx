import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaLightbulb,
  FaCouch,
  FaDoorOpen,
  FaUtensils,
  FaThLarge,
  FaTv,
  FaBed,
  FaHome,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination"; // استيراد ستايل النقاط

const iconMap = {
  lighting: <FaLightbulb className="text-yellow-500" />,
  outdoor: <FaDoorOpen className="text-emerald-500" />,
  dining: <FaUtensils className="text-rose-500" />,
  "sofa-l": <FaThLarge className="text-purple-500" />,
  "living-room": <FaTv className="text-blue-500" />,
  bedroom: <FaBed className="text-pink-500" />,
  "single-pieces": <FaCouch className="text-indigo-500" />,
  "full-house": <FaHome className="text-orange-500" />,
};

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commece-vitrine-api.vercel.app/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <section className="py-16 bg-gray-50/30 overflow-hidden">
      <h2 className="text-center text-3xl md:text-4xl font-black mb-12 text-gray-900 tracking-tight">
        تصفح أقسامنا
      </h2>

      <div className="max-w-5xl mx-auto px-4 relative">
        {categories.length > 0 && (
          <Swiper
            effect="coverflow"
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            slidesPerView="auto"
            observer={true}
            observeParents={true}
            coverflowEffect={{
              rotate: 0,
              stretch: -10,
              depth: 80,
              modifier: 1.1,
              slideShadows: false,
            }}
            autoplay={{ 
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={false}
            pagination={{ 
              clickable: true,
              dynamicBullets: true // يجعل النقاط تصغر وتكبر حسب العدد لجمالية أكثر
            }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="categories-swiper !pb-16 !px-4"
          >
            {categories.map((cat) => (
              <SwiperSlide
                key={cat._id}
                className="!w-[200px] md:!w-[250px]"
              >
                <Link
                  to={`/${cat.slug}/${cat._id}`}
                  className="
                    group block bg-white rounded-[2rem] px-6 py-10 text-center
                    border-2 border-gray-100
                    shadow-md
                    transition-all duration-400
                    hover:-translate-y-2
                    hover:border-yellow-400
                    hover:shadow-[0_20px_40px_rgba(234,179,8,0.25)]
                  "
                >
                  <div
                    className="
                      mx-auto mb-6 w-16 h-16 md:w-20 md:h-20 rounded-full
                      flex items-center justify-center
                      bg-yellow-400/10
                      border border-yellow-200
                      transition-all duration-400
                      group-hover:scale-110
                      group-hover:bg-yellow-400
                    "
                  >
                    <span className="text-3xl md:text-4xl group-hover:brightness-0 group-hover:invert transition-all">
                      {iconMap[cat.slug] || <FaHome />}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-extrabold text-gray-900 transition-colors group-hover:text-yellow-600">
                    {cat.name}
                  </h3>

                  <div className="mx-auto mt-4 w-10 h-1 bg-yellow-400 rounded-full transition-all duration-400" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style>{`
        /* تخصيص نقاط التنقل (Pagination) */
        .swiper-pagination-bullet {
          background: #d1d5db !important; /* لون رمادي للنقاط غير النشطة */
          opacity: 1 !important;
        }

        .swiper-pagination-bullet-active {
          background: #facc15 !important; /* لون أصفر للنقطة النشطة */
          width: 24px !important; /* تطويل النقطة النشطة */
          border-radius: 12px !important;
          transition: all 0.3s ease-in-out;
        }

        /* تحسين مكان النقاط */
        .swiper-pagination {
          bottom: 10px !important;
        }
      `}</style>
    </section>
  );
};

export default CategoriesGrid;