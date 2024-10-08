import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page from './page'; // 引入 Page 组件
import AdminPage from './page/AdminPage'; // 引入 AdminPage 组件

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} /> {/* 默认路径指向 Page */}
        <Route path="/admin" element={<AdminPage />} /> {/* 新增 admin 路由 */}
      </Routes>
    </Router>
  );
}


