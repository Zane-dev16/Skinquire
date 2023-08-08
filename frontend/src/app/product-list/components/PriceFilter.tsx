import styles from "./PriceFilter.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

type PriceFilterProps = {
  handleSingleSelect: (price: string, paramKey: string) => void;
  currentMin: string | null;
  currentMax: string | null;
};

const PriceFilter: React.FC<PriceFilterProps> = ({
  handleSingleSelect,
  currentMin,
  currentMax,
}) => {
  const [minPrice, setMinPrice] = useState(currentMin ? currentMin : "");
  const [maxPrice, setMaxPrice] = useState(currentMax ? currentMax : "");

  const filterPrice = (paramKey: string) => {
    if (paramKey === "min") {
      if (maxPrice && minPrice > maxPrice && minPrice && maxPrice) {
        setMinPrice(maxPrice);
      }
      handleSingleSelect(minPrice, paramKey);
    } else {
      if (minPrice && minPrice > maxPrice && minPrice && maxPrice) {
        setMaxPrice(minPrice);
      }
      handleSingleSelect(maxPrice, paramKey);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    paramKey: string
  ) => {
    if (e.repeat) return;
    if (e.key === "Enter") {
      filterPrice(paramKey);
    }
  };

  const positiveIntegerPattern = /^[0-9]*$/;

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (positiveIntegerPattern.test(newValue)) {
      setMinPrice(newValue);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (positiveIntegerPattern.test(newValue)) {
      setMaxPrice(newValue);
    }
  };

  return (
    <div>
      <h3>Price</h3>
      <div>
        <input
          className={styles.priceInput}
          type="text"
          pattern="[0-9]*"
          placeholder="Min Price"
          value={minPrice}
          onBlur={() => filterPrice("min")}
          onChange={handleMinPriceChange}
          onKeyDown={(e) => handleKeyDown(e, "min")}
        />
        <input
          className={styles.priceInput}
          type="text"
          pattern="[0-9]*"
          placeholder="Max Price"
          value={maxPrice}
          onBlur={() => filterPrice("max")}
          onChange={handleMaxPriceChange}
          onKeyDown={(e) => handleKeyDown(e, "max")}
        />
      </div>
      <motion.div drag="x" className={styles.slider}></motion.div>
    </div>
  );
};

export default PriceFilter;
