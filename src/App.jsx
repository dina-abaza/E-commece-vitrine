import React from 'react';
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
import AdminLayout from './layout/adminLayout';
import AdminLogin from './pages/admin/adminLogin';
import CustomerLayout from './layout/customerLayout';
import ProductDetails from './pages/customer/productDetails';
import Payment from './pages/customer/payment';
import ProductByCategory from './components/customer/productByCategory';
import Register from './pages/customer/register';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
        <Routes>

      <Route path="/" element={<CustomerLayout />}>

        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
        <Route path="exhibitions" element={<Exhibitions />} />
        <Route path='register' element={<Register/>}/>
        <Route path="login" element={<Login />} />
        <Route path="allProducts" element={<AllProducts />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/payment" element={<Payment />} />
         <Route path="/:slug/:categoryId" element={<ProductByCategory />} />
        
       </Route>

        <Route path="/admin" element={<AdminLayout/>}>

          <Route path="login" element={<AdminLogin/>}/>
          
        </Route>

        </Routes>
  

    </div>
  );
}

export default App;
