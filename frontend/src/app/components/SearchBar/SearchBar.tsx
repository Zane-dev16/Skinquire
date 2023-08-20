"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/graphql";
import { createSearchQueryWithTitleUrl } from "@/utils/filterUtils";

interface Product {
  id: number;
  attributes: {
    name: string;
  };
}

type FormData = {
  query: string;
};

interface ResponseData {
  products: {
    data: Product[];
  };
}

export default function SearchBar() {
  const { register, handleSubmit } = useForm<FormData>();
  const [query, setQuery] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();

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
  /* 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.repeat) return;
    if (e.key === "Enter") {
      router.push(
        createSearchQueryWithTitleUrl(
          "/product-list",
          params,
          "query",
          query,
          `Search Results for: ${query}`
        )
      );
    }
  }; */
  const onSubmit: SubmitHandler<FormData> = (data) => {
    router.push(
      createSearchQueryWithTitleUrl(
        "/product-list",
        params,
        "query",
        data.query,
        `Search Results for: ${query}`
      )
    );
  };

  if (error) {
    console.error("Error searching products:", error);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("query")}
          type="search"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          // onKeyDown={(e) => handleKeyDown(e)}
        />
      </form>

      {query && data && inputFocused && (
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
