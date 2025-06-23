
import React from 'react';
import ImageSlider from "../../components/customer/imagSlider";
import CategoriesGrid from "../../components/customer/gridLinks";
import OfferCard from "../../components/customer/offerCard";

function Home() {
  return (
    <>
      <ImageSlider />
      <CategoriesGrid />

  <div className="flex flex-col gap-10 mb-10">
  <OfferCard
    image="/kanapa.jpg"
    title="قطع تبدأ من 500"
    link="/offers?categorySlug=single-pieces&maxPrice=3000"
  />
  <OfferCard
    image="/room.jpg"
    title="غرف نوم تبدأ من 20 الف"
    link="/offers?categorySlug=bedroom&maxPrice=20000"
  />
  <OfferCard
    image="/rokna.webp"
    title="ركن تبدأ من 7 الاف"
    link="/offers?categorySlug=living-room&maxPrice=15000"
  />
  <OfferCard
    image="/sofra.jpg"
    title="سفره تبدأ من 10الاف"
    link="/offers?categorySlug=dining&maxPrice=11000"
  />
</div>

    </>
  );
}

export default Home;
