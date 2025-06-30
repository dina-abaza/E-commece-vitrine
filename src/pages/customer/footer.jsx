
import React from 'react';
import { FaFacebookF, FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-18 px-10 text-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col space-y-6 md:flex-row md:space-y-0 justify-between items-start ">

        <div className="flex-1 flex flex-col gap-2">
          <a href="/about" className="hover:text-blue-600 transition duration-200">من نحن</a>
          <a href="/contact" className="hover:text-blue-600 transition duration-200">تواصل معنا</a>
          <a href="/privacy-policy" className="hover:text-blue-600 transition duration-200">سياسة الخصوصية</a>
          <a href="/return-policy" className="hover:text-blue-600 transition duration-200">سياسة الاسترجاع</a>
          <a href="/exhibitions" className="hover:text-blue-600 transition duration-200">المعارض</a>
        </div>

        <div className="flex-1 flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Contact Me</h2>
          <div className="flex gap-10">
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="text-2xl text-blue-800 hover:text-blue-600 transition duration-200" />
            </a>
            <a href="https://wa.me/01120210077" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="text-2xl text-green-600 hover:text-green-500 transition duration-200" />
            </a>
            <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-2xl text-pink-600 hover:text-pink-500 transition duration-200" />
            </a>
            <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="text-2xl text-sky-500 hover:text-sky-400 transition duration-200" />
            </a>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 text-right">
          <p><span className="text-yellow-500 font-bold">التجمع الخامس:</span> محور محمد نجيب</p>
          <p><span className="text-yellow-500 font-bold">الشيخ زايد:</span> بجوار مول مزار - شارع البستان - الحي التاسع</p>
          <p><span className="text-yellow-500 font-bold">مدينة نصر:</span> 9 عمارات مقاتلي رمضان - شارع حسن المأمون - قبل النادى الأهلى</p>
          <p className="font-bold">
            <a href="tel:+01120210077" className="hover:text-blue-600 transition duration-200">01120210077</a>
          </p>
          <p className="text-sm">رقم التسجيل الضريبي: 123-456-789</p>
        </div>
      </div>

      <div className="w-full mt-8 pt-4 border-t border-gray-300 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Vitrine. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
