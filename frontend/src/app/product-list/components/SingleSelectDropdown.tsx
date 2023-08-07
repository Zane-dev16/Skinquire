import React, { useState } from "react";
import styles from "./SingleSelectDropdown.module.css"; // Update with your CSS module

interface SingleSelectDropdownProps {
  title: string;
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
}

const SingleSelectDropdown: React.FC<SingleSelectDropdownProps> = ({
  title,
  options,
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const dropdownOptions = ["None", ...options]; // Prepend "None" to options

  return (
    <div className={styles.singleSelectDropdown}>
      <h3 className={styles.dropdownTitle}>{title}</h3>

      <div
        className={styles.selectedOptionBox}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || "Select an option"}
      </div>
      {isOpen && (
        <ul className={styles.optionsList}>
          {dropdownOptions.map((option) => (
            <li
              key={option}
              className={styles.option}
              onClick={() => handleOptionClick(option === "None" ? "" : option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SingleSelectDropdown;
