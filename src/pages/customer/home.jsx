
import React from 'react';
import ImageSlider from '../../components/imagSlider';
import CategoriesGrid from '../../components/gridLinks';
import OfferCard from '../../components/offerCard';

function Home() {
  return (
    <>
      <ImageSlider />
      <CategoriesGrid />

      <div className="flex flex-col gap-10 mb-10">
            <OfferCard image="/kanapa.jpg" title="كنب يبدأ من 8 الاف" link="/sofas" />
            <OfferCard image="/room.jpg" title="غرف نوم تبدأ من 20 الف" link="/bedrooms" />
            <OfferCard image="/rokna.webp" title="ركن تبدأ من 15 الف" link="/corner-sets" />
            <OfferCard image="/sofra.jpg" title="سفره تبدأ من 11 الف" link="/dining-tables" />

      </div>
    </>
  );
}

export default Home;
