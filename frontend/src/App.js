import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Monitoring from "./components/Monitoring/Monitoring";
import Manage from "./components/Manage/Manage";
import PriceManage from "./components/PriceManage/PriceManage";
import createStore from "react-auth-kit/createStore";
import EmbedCalcFunc from "./components/Home/EmbedCalcFunc";

function App() {
  const location = useLocation()

  const {pathname} = location

  return (
    <div className="relative">
      {!(pathname === "/embed-calc") && <Header />}
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
        <Route exact path="/embed-calc" element={<EmbedCalcFunc />} />
      </Routes>
      {!(pathname === "/embed-calc") && <Footer />}
    </div>
  );
}

export default App;
