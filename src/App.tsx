import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home/Home';
import { Shop } from './pages/Shop/Shop';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import { Cart } from './pages/Cart/Cart';
import { Contact } from './pages/Contact/Contact';
import { Customizer } from './pages/Customizer/Customizer';
import { NotFound } from './pages/NotFound/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          <Route path="customizer" element={<Customizer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
