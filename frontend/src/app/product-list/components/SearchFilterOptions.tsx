import styles from "./SearchFilterOptions.module.css";

import { useCallback, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SearchFilterOptions = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const retrievedBrandParam = searchParams.get("brands");

  let retrievedBrands = [];
  if (retrievedBrandParam) {
    // Parse the JSON string to get back the array
    retrievedBrands = JSON.parse(retrievedBrandParam);
  }
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];
  const handleItemClick = useCallback((item: string) => {
    console.log("clicked");
    const params = new URLSearchParams(searchParams.toString());
    const setBrands = ["Brand A", "Brand B"];
    params.set("brands", JSON.stringify(setBrands));
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
              selectedItems.includes(item)
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
