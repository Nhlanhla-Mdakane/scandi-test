

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';

import AddProducts from "./components/addProduct.js";
import Home from "./components/home.js";



function App() {
  return (
    <div className="App">

    <Router>

       <Routes>

        <Route path="/" caseSensitive={false} element={<Home  />} />

         <Route path="/add" caseSensitive={false} element={<AddProducts  />} />


    </Routes>


   </Router>
    </div>
  );
}

export default App;
