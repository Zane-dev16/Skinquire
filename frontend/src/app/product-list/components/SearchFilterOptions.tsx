import styles from "./SearchFilterOptions.module.css";

import { useState } from "react";

const SearchFilterOptions = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];
  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

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
