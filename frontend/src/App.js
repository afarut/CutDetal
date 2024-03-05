import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Monitoring from "./components/Monitoring/Monitoring";
import Manage from "./components/Manage/Manage";
import PriceManage from "./components/PriceManage/PriceManage";
import createStore from "react-auth-kit/createStore";

function App() {
  return (
    <div className="relative">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/monitoring"
          element={
            <RequireAuth fallbackPath={"/"}>
              <Monitoring />
            </RequireAuth>
          }
        />
        <Route exact path="/manage" element={<RequireAuth fallbackPath={"/"}><Manage /></RequireAuth>} />
        <Route exact path="/manage/price" element={<RequireAuth fallbackPath={"/"}><PriceManage /></RequireAuth>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
