"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import Link from "next/link";

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

export const revalidate = 5;

const QUERY_PRODUCTS = gql`
  query SearchProducts($searchQuery: String!) {
    products(filters: { name: { containsi: $searchQuery } }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { data, error } = useSuspenseQuery<ResponseData>(QUERY_PRODUCTS, {
    variables: { searchQuery: query },
  });

  if (error) {
    console.error("Error fetching products:", error);
  }

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
          {data.products.data.map((product: any) => (
            <div key={product.id}>
              <Link href={`/${product.id}`}>{product.attributes.name}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
