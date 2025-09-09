import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import ContactForm from './components/ContactForm.jsx';
import Layout from './components/Layout.jsx';
import ThankYou from './pages/ThankYou.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ContactForm />} />
          <Route path="thanks" element={<ThankYou />} />
          <Route path="*" element={<ContactForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
