"use client";

import styles from "./FilterOptions.module.css";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import Link from "next/link";

import SearchFilterOptions from "./SearchFilterOptions";

const FilterOptions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];
  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div className={styles.filterOptions}>
        <h2>Filters</h2>

        <div>
          <p>Sort By</p>
          <Link
            href={
              // <pathname>?order=desc
              pathname + "?" + createQueryString("order", ":asc")
            }
          >
            <div className={styles.button}>ASC</div>
          </Link>
          <Link
            href={
              // <pathname>?order=desc
              pathname + "?" + createQueryString("order", ":desc")
            }
          >
            <div className={styles.button}>DESC</div>
          </Link>
        </div>

        <SearchFilterOptions></SearchFilterOptions>
      </div>
    </>
  );
};

export default FilterOptions;
