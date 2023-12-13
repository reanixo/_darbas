import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Index from "./Index";
import AddDishes from "./Dashboard/AddDishes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<Index />}></Route>
        <Route path="/addDish" element={<AddDishes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
