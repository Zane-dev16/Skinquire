import styles from "./SearchFilterOptions.module.css";

import { useCallback, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SearchFilterOptions = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const retrievedBrandsParam = searchParams.get("brands");

  let selectedBrands: string[] = [];
  if (retrievedBrandsParam) {
    // Parse the JSON string to get back the array
    selectedBrands = JSON.parse(retrievedBrandsParam);
  }
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];

  const handleItemClick = useCallback((item: string) => {
    if (selectedBrands.includes(item)) {
      selectedBrands = selectedBrands.filter((brand) => brand !== item);
    } else {
      selectedBrands = [...selectedBrands, item];
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("brands", JSON.stringify(selectedBrands));
    router.push(pathname + "?" + params.toString());
  }, []);

  return (
    <div>
      <h3 className={styles.dropdownTitle}>Multi-Select Dropdown</h3>
      <ul className={styles.dropdownList}>
        {brands.map((item) => (
          <li
            key={item}
            onClick={() => handleItemClick(item)}
            className={`${styles.option} ${
              selectedBrands.includes(item)
                ? styles.optionSelected
                : styles.optionNotSelected
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilterOptions;
