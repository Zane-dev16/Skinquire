import styles from "./SearchFilterOptions.module.css";
import { useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";

interface SearchFilterOptionsProps {
  options: string[];
  selectedItems: string[];
  handleItemClick: (item: string) => void;
  title: string;
}

const SearchFilterOptions: React.FC<SearchFilterOptionsProps> = ({
  options,
  selectedItems,
  handleItemClick,
  title,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div className={styles.searchFilterOptions}>
      <h3 className={styles.dropdownTitle}>{title}</h3>
      <ul className={styles.dropdownList}>
        {options.map((item: string) => (
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
