
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/customer/home';
import About from './pages/customer/about';
import ContactForm from './pages/customer/contact';
import PrivacyPolicy from './pages/customer/privacyPolice';
import ReturnPolicy from './pages/customer/returnPolicy';
import Exhibitions from './pages/customer/exhibitions';
import Login from './pages/customer/login';
import Register from './pages/customer/register';
import AllProducts from './pages/customer/allProducts';
import ProductDetails from './pages/customer/productDetails';
import ProductByCategory from './components/customer/productByCategory';
import Cart from './pages/customer/cart';
import Payment from './pages/customer/payment';
import AdminLogin from './pages/admin/adminLogin';
import HomeDashboard from './pages/admin/adminHome';
import UsersPage from './pages/admin/users';
import OrdersPage from './pages/admin/ordersPage';
import AdminSettings from './pages/admin/setting';
import CustomerLayout from './layout/customerLayout';
import AdminLayout from './layout/adminLayout';
import AdminRoute from './routes/adminRoute';
import AddProduct from './pages/admin/addProduct';
import AdminProducts from './pages/admin/adminProducts';
import OffersPage from './pages/customer/offersPage';

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
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="allProducts" element={<AllProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="payment" element={<Payment />} />
          <Route path=":slug/:id" element={<ProductByCategory />} />
          <Route path="offers" element={<OffersPage/>} />
        </Route>

  
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />

          <Route
            path="dashboard"
            element={
              <AdminRoute>
                  <HomeDashboard />
              </AdminRoute>
              
            
            }
          />
          <Route
            path="users"
            element={
              <AdminProducts>
                <UsersPage />
              </AdminProducts>
               
            
            }
          />
          <Route
            path="orders"
            element={
              <AdminRoute>
                 <OrdersPage />
              </AdminRoute>
               
              
            }
          />
          <Route
            path="settings"
            element={
            <AdminRoute>
                <AdminSettings />
            </AdminRoute>
              
            
            }
          />

          <Route path="add"
          element={
        <AdminRoute>
          <AddProduct/>
        </AdminRoute>
             
            
          }
          />

          <Route path="products"
          element={
            <AdminRoute>
               <AdminProducts/>
            </AdminRoute>
             
            
        
          }/>

        </Route>

      </Routes>
    </div>
  );
}

export default App;
