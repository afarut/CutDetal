import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Monitoring from './components/Monitoring/Monitoring';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/monitoring" element={<Monitoring />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
