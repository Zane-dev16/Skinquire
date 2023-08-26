"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/graphql";
import styles from "./SearchBar.module.css"; // Update the path to your CSS module
import { createSearchQueryWithTitleUrl } from "@/utils/filterUtils";
import { motion } from "framer-motion";
import Image from "next/image";

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
  const { register, handleSubmit, formState: errors } = useForm<FormData>();
  const [query, setQuery] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
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
    console.log(query);

    if (query) {
      router.push(
        createSearchQueryWithTitleUrl(
          "/product-list",
          params,
          "query",
          query,
          `Search Results for: ${query}`
        )
      );
    } else {
      setInputFocused(true);

      return;
    }
  };

  const inputVariants = {
    initial: {
      scaleX: 0,
    },
    open: {
      scaleX: 1,
      transition: { type: "spring", duration: 4, stiffness: 50 },
    },
  };

  const buttonVariants = {
    initial: { x: "-15vw", scale: 1.7 },
    open: {
      x: 0,
      scale: 1,
      transition: { type: "spring", duration: 4, stiffness: 50 },
    },
    hover: {
      scale: isOpen ? 1.2 : 1.9,
    },
  };

  if (error) {
    console.error("Error searching products:", error);
  }

  return (
    <motion.div className={styles.searchBarContainer}>
      <motion.form
        className={styles.searchForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.input
          ref={inputRef}
          initial="initial"
          animate={isOpen ? "open" : "initial"}
          variants={inputVariants}
          className={styles.searchInput}
          transition={{ duration: 0.6 }}
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />

        <motion.button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
            setIsOpen(true);
          }}
          initial="initial"
          animate={isOpen ? "open" : "initial"}
          whileHover="hover"
          variants={buttonVariants}
          transition={{ type: "spring", duration: 1 }}
          className={styles.searchButton}
          type="submit"
        >
          <Image
            src="/search-icon.svg"
            alt="search-icon"
            width={25}
            height={25}
          />
        </motion.button>
      </motion.form>

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
    </motion.div>
  );
}
