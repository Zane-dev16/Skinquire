"use client";
import styles from "./FilterOptions.module.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import Link from "next/link";
import fetcher from "@/app/api/graphql";
import useSWR from "swr";
import SearchFilterOptions from "./SearchFilterOptions";

interface Brand {
  attributes: {
    name: string;
  };
}

interface FilterOptionsProps {}

const FilterOptions: React.FC<FilterOptionsProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

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
  const query = createQuery("brands");
  const { data, isLoading, error } = useSWR(query, fetcher);

  const getSelectedItems = (paramKey: string): string[] => {
    const retrievedItemsParam = searchParams.get(paramKey);
    if (retrievedItemsParam) {
      const selectedItemsList = JSON.parse(retrievedItemsParam);
      if (Array.isArray(selectedItemsList)) {
        return selectedItemsList;
      }
    }
    console.error("No items found");
    return [];
  };
  const selectedBrands = getSelectedItems("brands");

  const handleItemClick = useCallback(
    (item: string, selectedItems: string[], paramKey: string) => {
      const itemIsSelected = selectedItems.includes(item);
      const newSelectedItems = itemIsSelected
        ? selectedItems.filter((selected) => selected !== item)
        : [...selectedItems, item];
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramKey, JSON.stringify(newSelectedItems));
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname, router]
  );

  const createSearchQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  if (error) {
    return <div>Error Fetching Data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const brandOptions =
    data?.brands.data.map((brand: Brand) => brand.attributes.name) || [];
  return (
    <>
      <div className={styles.filterOptions}>
        <h2>Filters</h2>

        <div>
          <p>Sort By</p>
          <Link
            href={
              // <pathname>?order=desc
              pathname + "?" + createSearchQueryString("order", ":asc")
            }
          >
            <div className={styles.button}>ASC</div>
          </Link>
          <Link
            href={
              // <pathname>?order=desc
              pathname + "?" + createSearchQueryString("order", ":desc")
            }
          >
            <div className={styles.button}>DESC</div>
          </Link>
        </div>

        <SearchFilterOptions
          options={brandOptions}
          selectedItems={selectedBrands}
          handleItemClick={(item) =>
            handleItemClick(item, selectedBrands, "brands")
          }
          title="Brand"
        />
      </div>
    </>
  );
};

export default FilterOptions;
