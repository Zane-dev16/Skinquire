"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/graphql";
import styles from "./SearchBar.module.css"; // Update the path to your CSS module
import { createSearchQueryWithTitleUrl } from "@/utils/filterUtils";
import { motion, AnimatePresence } from "framer-motion";
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
    if (isOpen && query) {
      router.push(
        createSearchQueryWithTitleUrl(
          "/product-list",
          params,
          "query",
          query,
          `Search Results for: ${query}`
        )
      );
      setIsOpen(true);
    } else {
      setInputFocused(true);
      setIsOpen(true);
      return;
    }
    if (inputRef.current && isOpen) {
      inputRef.current.focus();
    }
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
  useEffect(() => {
    if (inputRef.current && isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  if (error) {
    console.error("Error searching products:", error);
  }
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Check if the related target is the search button
    setInputFocused(false);
    if (
      !event.relatedTarget ||
      !event.relatedTarget.classList.contains(styles.searchButton)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <motion.div className={styles.searchBarContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence>
          {isOpen && (
            <motion.input
              ref={inputRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut" }}
              className={styles.searchInput}
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={handleBlur}
            />
          )}
        </AnimatePresence>

        <motion.button
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
    </motion.div>
  );
}
