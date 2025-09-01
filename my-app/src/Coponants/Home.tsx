import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, UseSelector } from "react-redux";
import UserSlice from "../features/UserSlice"
import Advertistings from "./Advertisting";
import { link } from "fs";


const Home = () => {
  const email = useSelector((mystate: any) => mystate.UserSlice.email)
  return (

    <div>
      <h1>ברוכים הבאים לדף הבית!</h1><h1>שלום {email}</h1>
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="cart" style={{ textDecoration: "none" }}>🛒</Link>
        <Link to="Advertisting">הפרסומות שיש לנו להציע</Link>
        {email=="chaya5887@gmail.com" &&(
          <div>
          <Link to="details">הפרטים שלי </Link>"  "

          <Link to="Advertisting">הוסף פרסומת  </Link>
          {/* <button onClick={a}></button> */}
          </div>
        )
        }
      </nav>
      <Outlet />
    </div>
  )
};

export default Home;
