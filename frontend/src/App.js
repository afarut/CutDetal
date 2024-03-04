import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Monitoring from './components/Monitoring/Monitoring';
import Manage from './components/Manage/Manage';
import PriceManage from './components/PriceManage/PriceManage';

function App() {
  return (
    <div className='relative'>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/monitoring" element={<Monitoring />} />
        <Route exact path="/manage" element={<Manage />} />
        <Route exact path="/manage/price" element={<PriceManage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
