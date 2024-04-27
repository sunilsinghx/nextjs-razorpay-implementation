"use client";

import React, { useEffect, useState,useMemo } from "react";
import styles from "@/styles/cart.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { UseSelector, useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "../redux/store";
import { incrementQuantity,decrementQuantity,removeFromCart, clearCart } from "../redux/features/cart-slice";


type CartItem = {
  name: string;
  id: number;
  imagePath: string;
  price: number;
  description: string;
  quantity: number;
};

function page() {

  const router= useRouter()
const count = useAppSelector(state=> state.cartReducer.items.length)






  async function handleCheckout(sum:number)
  {
    const {data:{order}} = await axios.post(`http://localhost:3000/api/checkout`,{
      sum
    })

    
    

    const options = {
      key: process.env.KEY, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Sunil Singh",
      description: "Test App",
      image: "https://th.bing.com/th?id=OIP._BXCcqxwmsduYNCJj2XDtgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      order_id: order.id, 
      handler: async function(response:any){

      const {data}:any = await axios.post(`http://localhost:3000/api/verification`,{
          razorpay_order_id:response.razorpay_order_id,
          razorpay_payment_id:response.razorpay_payment_id,
          razorpay_signature:response.razorpay_signature
        })
        
        if(data.isAuthentic)
          {
            dispatch(clearCart())
            router.replace(`/paymentsuccess?reference=${response.razorpay_payment_id}`)
          }
          else
          {
            router.replace(`/failed`)

          }
    },
      prefill: {
          name: "Sunil Singh",
          email: "sunil@example.com",
          contact: "919199191"
      },
      notes: {
          address: "Pune MH"
      },
      theme: {
          color: "#121212"
      }
  }
  const razor = new (window as any).Razorpay(options);
      razor.open();
  
    
  }
  
  const dispatch = useDispatch<AppDispatch>();

  const cartArray = useAppSelector((state) => state.cartReducer.items);


  const sum=  cartArray.reduce((acc,curr)=> acc+ (curr.price*curr.quantity), 0)

 

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartHead}>Cart</h1>
      {cartArray.length === 0 ? (
        <h1 className={styles.emptyCart}>Cart is Empty</h1>
      ) : null}

      <div>
        {cartArray.map((item, index) => (
          <div key={item.id} className={styles.cartCard}>
            <div className={styles.s1}>
              <Image
                src={item.imagePath}
                alt={item.name}
                width={200}
                height={200}
              />
              <h3>{item.name}</h3>
            </div>

            <div className={styles.s1}>
              <h2>{item.price * item.quantity}</h2>
              <div className={styles.incredecre}>
                <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>

                <span>{item.quantity}</span>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
              </div>

              <svg
                onClick={() => dispatch(removeFromCart(item.id))}
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                ></path>
              </svg>
            </div>
          </div>
        ))}

        {count > 0 && 
        <div >
          <button
          className={styles.checkout}
            onClick={()=>handleCheckout(sum)}
          >Chekout</button>
        </div>}
      </div>
    </div>
  );
}

export default page;
