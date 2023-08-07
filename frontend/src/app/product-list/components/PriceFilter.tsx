import styles from "./PriceFilter.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

type PriceFilterProps = {
  filterPrice: (paramKey: string, price: string) => void;
  currentMin: string | null;
  currentMax: string | null;
};

const PriceFilter: React.FC<PriceFilterProps> = ({
  filterPrice,
  currentMin,
  currentMax,
}) => {
  const [minPrice, setMinPrice] = useState(currentMin ? currentMin : "");
  const [maxPrice, setMaxPrice] = useState(currentMax ? currentMax : "");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    paramKey: string
  ) => {
    if (e.repeat) return;
    if (e.key === "Enter") {
      filterPrice(paramKey, paramKey === "min" ? minPrice : maxPrice);
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
          onBlur={() => filterPrice("min", minPrice)}
          onChange={handleMinPriceChange}
          onKeyDown={(e) => handleKeyDown(e, "min")}
        />
        <input
          className={styles.priceInput}
          type="text"
          pattern="[0-9]*"
          placeholder="Max Price"
          value={maxPrice}
          onBlur={() => filterPrice("max", maxPrice)}
          onChange={handleMaxPriceChange}
          onKeyDown={(e) => handleKeyDown(e, "max")}
        />
      </div>
      <motion.div drag="x" className={styles.slider}></motion.div>
    </div>
  );
};

export default PriceFilter;
