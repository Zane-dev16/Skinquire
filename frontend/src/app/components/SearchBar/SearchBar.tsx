"use client";

import { useState } from "react";
import { useEffect } from "react";

async function getData() {
  const res = await fetch(
    "http://127.0.0.1:1337/api/products?filters[name][containsi]=sali"
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SearchBar() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("a");
  }, []);

  return (
    <input
      type="search"
      placeholder="Search for products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
