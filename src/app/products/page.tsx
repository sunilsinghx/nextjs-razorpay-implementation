"use client";
import styles from "@/styles/productcard.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { addInCart, incrementQuantity } from "../redux/features/cart-slice";

type Product = {
  name: string;
  id: number;
  imagePath: string;
  price: number;
  description: string;
};

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector(state=> state.cartReducer.items)

  const products: Product[] = [
    {
      name: "Product 1",
      id: 1,
      imagePath: "https://source.unsplash.com/random",
      price: 100,
      description: "this is desc",
    },
    {
      name: "Product 2",
      id: 99,
      imagePath: "https://source.unsplash.com/random",
      price: 100,
      description: "this is desc",
    },
    {
      name: "Product 3",
      id: 88,
      imagePath: "https://source.unsplash.com/random",
      price: 100,
      description: "this is desc",
    },
    {
      name: "Product 4",
      id: 39,
      imagePath: "https://source.unsplash.com/random",
      price: 100,
      description: "this is desc",
    },
    {
      name: "Product 5",
      id: 22,
      imagePath: "https://source.unsplash.com/random",
      price: 100,
      description: "this is desc",
    },
    {
      name: "Product 6",
      id: 33,
      imagePath: "https://source.unsplash.com/random",
      price: 100,
      description: "this is desc",
    },
    {
      name: "Product 7",
      id: 6,
      imagePath: "https://source.unsplash.com/random",
      price: 100,
      description: "this is desc",
    },
    {
      name: "Product 8",
      id: 990,
      imagePath: "https://source.unsplash.com/random",
      price: 190,
      description: "this is desc",
    },
  ];

  const addToCart = (product: Product) => {
    //if prodcut already in cart we just increment quantity count
    const itemIndex = cartArray.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
       
        dispatch(incrementQuantity(product.id));

    }else
    {
        const newProduct = {...product, quantity:1 }
        
        dispatch(addInCart(newProduct))
    }
  };

  return (
    <div className={styles.productsContainer}>
      {products.map((product, index) => (
        <div className={styles.productcard1} key={product.id}>
          <Image
            src={product.imagePath}
            alt={product.name}
            width={200}
            height={200}
          />

          <div className={styles.row}>
            <h3>{product.name}</h3>
            <p>Rs: {product.price}</p>
          </div>
          <div className={styles.row1}>
            <button>View</button>
            <button onClick={() => addToCart(product)}>add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
