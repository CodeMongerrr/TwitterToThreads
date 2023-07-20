import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import fs from "fs";
import Home from "./components/Home";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portal from "./components/portal";
import Login from "./components/Login";
import Payment from "./components/payment";
import Setup from "./components/setup";
import Upload from "./components/upload";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
