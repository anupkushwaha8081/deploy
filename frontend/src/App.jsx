import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import AppRoutes from './routes/Routes';
import Navbar from './components/shared/navbar';
import Footer from './components/shared/Footer';

export default function App() {
  return (
    <BrowserRouter> {/* Only wrap everything with BrowserRouter here */}
      <div>
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
