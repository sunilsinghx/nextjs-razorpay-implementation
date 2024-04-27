"use client";

import React, { useState } from "react";
import styles from "@/styles/navbar.module.css";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../redux/store";


function Navbar() {
  const Router = useRouter();
  const count = useAppSelector(state=> state.cartReducer.items.length)
  //get count of array len
  

  return (
    <div className={styles.navbar}>
      <h1 
      onClick={() => Router.push("/")

      }>E-Mart</h1>

      <div className={styles.cart}>
        <span className={styles.cartCount}>{count}</span>

        <svg
          onClick={()=>Router.push('/cart')}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Navbar;
