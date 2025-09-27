import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function OfferCard({ image, title, link, direction = "right" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3});

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "right" ? 100 : -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative w-full max-w-6xl m-auto h-[600px] shadow-lg overflow-hidden"
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 text-right">
        <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
        <Link
          to={link}
          className="bg-yellow-400 text-blue-900 px-6 py-2 rounded shadow"
        >
          تسوق الآن
        </Link>
      </div>
    </motion.div>
  );
}
