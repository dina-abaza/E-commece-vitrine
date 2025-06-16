import React from 'react';
import NavBar from './pages/customer/navbar';
import Footer from './pages/customer/footer';
import Home from './pages/customer/home';
import About from './pages/customer/about';
import ContactForm from './pages/customer/contact';
import PrivacyPolicy from './pages/customer/privacyPolice';
import { Routes, Route } from 'react-router-dom'; 
import ReturnPolicy from './pages/customer/returnPolicy';
import Exhibitions from './pages/customer/exhibitions';
import Login from './pages/customer/login';
import AllProducts from './pages/customer/allProducts';
import Cart from './pages/customer/cart';
import Decor from './pages/customer/decor';
import Furniture from './pages/customer/furniture';
import Ligting from './pages/customer/ligting';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/contact' element={<ContactForm/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy/>} />
          <Route path="/exhibitions" element={<Exhibitions/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/allProducts' element={<AllProducts/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/decor" element={<Decor/>} />
          <Route path="/ligting" element={<Ligting />} />

        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
