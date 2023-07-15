import ProductCard from "./components/ProductCard/ProductCard";
import Link from "next/link";

async function getData() {
  const res = await fetch("http://127.0.0.1:1337/api/products?populate=*", {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <main></main>;
}
