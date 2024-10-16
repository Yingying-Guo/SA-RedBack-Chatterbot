import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page from './page'; 
import AdminPage from './page/AdminPage'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} /> {/* Page */}
        <Route path="/admin" element={<AdminPage />} /> {/* admin route */}
      </Routes>
    </Router>
  );
}


