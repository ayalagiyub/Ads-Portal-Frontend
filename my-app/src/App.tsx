import React from "react";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import UserSlice from "./features/UserSlice"
import CartSlice from "./features/CartSlice"

import Login from "./Coponants/login/Login";
import Register from "./Coponants/Register";
import Details from "./Coponants/details";
import Home from "./Coponants/Home";
import Advertistings from "./Coponants/Advertisting";
import Cart from "./Coponants/cart";



const mystore = configureStore(
  {
    reducer: {
      UserSlice,
      CartSlice
    }
  }
)

function App() {
  return (
    <Provider store={mystore}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} >
            <Route path="details" element={<Details />} />
            <Route path="Advertisting" element={<Advertistings />} />
            <Route path="cart" element={<Cart/>}></Route>
            <Route path="personal_details"></Route>
            <Route path="add_product"></Route>
            <Route path="product_details"></Route>

          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;



