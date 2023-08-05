import styles from "./SearchFilterOptions.module.css";

import { useCallback, useState, FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { create } from "domain";
import useSWR from "swr";
import fetcher from "@/app/api/graphql";

interface SearchFilterOptionsProps {
  options: string[];
}

interface Brand {
  attributes: {
    name: string;
  };
}

const createQuery = (entityRequestName: string) => {
  return `
    query {
        ${entityRequestName} {
          data{
            attributes{
              name
            }
          }
        }
      }
    `;
};

const SearchFilterOptions: FC<SearchFilterOptionsProps> = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = createQuery("brands");
  const { data, isLoading, error } = useSWR(query, fetcher);
  console.log(data);

  const retrievedBrandsParam = searchParams.get("brands");

  let selectedBrands: string[] = [];
  if (retrievedBrandsParam) {
    // Parse the JSON string to get back the array
    selectedBrands = JSON.parse(retrievedBrandsParam);
  }

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const options =
    data?.brands.data.map((brand: Brand) => brand.attributes.name) || [];

  return (
    <div>
      <h3 className={styles.dropdownTitle}>Multi-Select Dropdown</h3>
      <ul className={styles.dropdownList}>
        {options.map((item: string) => (
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
