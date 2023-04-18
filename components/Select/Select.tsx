import { useState } from "react";
import classNames from "classnames";
import SvgChevronIcon from "@/icons/SvgChevronIcon";

import styles from "./Select.module.css";

export interface SelectProps {
  items: Array<{ title: string; value: string }>;
  selected: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Select({
  items,
  selected,
  onChange,
  placeholder = "No selection",
  className,
}: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedItem = items.find(({ value }) => value === selected);

  const handleItemClick = (value: string) => {
    setIsDropdownOpen(false);
    onChange(value);
  };

  return (
    <div className={styles.container}>
      <button
        className={classNames(styles.button, className, {
          [styles.buttonOpen]: isDropdownOpen,
        })}
        onClick={() => setIsDropdownOpen(() => !isDropdownOpen)}
      >
        <span>{selectedItem?.title || placeholder}</span>
        <SvgChevronIcon className={styles.buttonIcon} />
      </button>

      {isDropdownOpen && (
        <ul className={styles.list}>
          {items.map(({ title, value }) => (
            <li
              className={styles.item}
              onClick={() => handleItemClick(value)}
              key={value}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
