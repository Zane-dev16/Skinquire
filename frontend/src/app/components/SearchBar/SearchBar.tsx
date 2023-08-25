"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/graphql";
import styles from "./SearchBar.module.css"; // Update the path to your CSS module
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
    <div className={styles.searchBarContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.searchInput}
          {...register("query")}
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </form>

      {query && data && inputFocused && (
        <div className={styles.resultsContainer}>
          {data.products.data.map((product: Product) => (
            <div key={product.id} className={styles.resultItem}>
              <Link
                onClick={() => setQuery("")}
                href={`/product-list/${product.id}`}
                className={styles.resultLink}
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
