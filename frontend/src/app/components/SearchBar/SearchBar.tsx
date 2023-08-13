"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/app/api/graphql";

interface Product {
  id: number;
  attributes: {
    name: string;
  };
}

interface ResponseData {
  products: {
    data: Product[];
  };
}

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const { data, error } = useSWR<ResponseData>(
    `
    query {
      products(filters: { name: { containsi:"${query}"} }) {
        data {
          id
          attributes {
            name
          }
        }
      }
    }
  `,
    fetcher
  );
  if (error) {
    console.error("Error searching products:", error);
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && data && (
        <div>
          {data.products.data.map((product: Product) => (
            <div key={product.id}>
              <Link
                onClick={() => setQuery("")}
                href={`/product-list/${product.id}`}
              >
                {product.attributes.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
