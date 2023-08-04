"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCallback } from "react";
import styles from "./FilterOptions.module.css";

const FilterOptions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

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
    </>
  );
};

export default FilterOptions;
