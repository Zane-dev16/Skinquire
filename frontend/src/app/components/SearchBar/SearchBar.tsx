"use client";

import { useEffect, useState } from "react";

async function getData(query: string) {
  const res = await fetch(
    `http://127.0.0.1:1337/api/products?filters[name][$containsi]=${query}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(query);
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <div>
          {data.map((product: any) => (
            <div key={product.id}>{product.attributes.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
