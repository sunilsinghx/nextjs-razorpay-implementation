"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"


export default function Home() {
  const Router = useRouter();

  return (
    <div className="home">
      <h1>Home Page</h1>
      <button onClick={() => Router.push("/products")}>Show Products</button>
    </div>
  );
}
