"use client";
import styles from "./FilterOptions.module.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import Link from "next/link";
import fetcher from "@/app/api/graphql";
import useSWR from "swr";
import SearchFilterOptions from "./SearchFilterOptions";
import { getSelectedItems } from "@/utils/filterUtils";

interface Item {
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
          ${entityRequestName}(sort: "name") {
            data{
              attributes{
                name
              }
            }
          }
        }
      `;
  };
  const brandQuery = createQuery("brands");
  const ingredientQuery = createQuery("ingredients");
  const skinConditionQuery = createQuery("skinConditions");
  const {
    data: brandData,
    isLoading: brandIsLoading,
    error: brandError,
  } = useSWR<{ brands: { data: Item[] } }>(brandQuery, fetcher);
  const {
    data: ingredientData,
    isLoading: ingredientIsLoading,
    error: ingredientError,
  } = useSWR<{ ingredients: { data: Item[] } }>(ingredientQuery, fetcher);
  const {
    data: skinConditionData,
    isLoading: skinConditionIsLoading,
    error: skinConditionError,
  } = useSWR<{ skinConditions: { data: Item[] } }>(skinConditionQuery, fetcher);
  const handleItemClick = useCallback(
    (item: string, selectedItems: string[], paramKey: string) => {
      const itemIsSelected = selectedItems.includes(item);
      const newSelectedItems = itemIsSelected
        ? selectedItems.filter((selected) => selected !== item)
        : [...selectedItems, item];
      router.push(
        pathname +
          "?" +
          createSearchQueryString(paramKey, JSON.stringify(newSelectedItems))
      );
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

  if (brandError || ingredientError) {
    return <div>Error Fetching Data</div>;
  }

  if (brandIsLoading || ingredientIsLoading || skinConditionIsLoading) {
    return <div>Loading...</div>;
  }
  console.log(skinConditionData);
  function generateFilterOptions(
    title: string,
    paramKey: string,
    data: Item[]
  ) {
    const selectedItems = getSelectedItems(searchParams, paramKey);
    return {
      title: title,
      options: data.map((item: Item) => item.attributes.name),
      selectedItems: selectedItems,
      handleItemClick: (item: string) =>
        handleItemClick(item, selectedItems, paramKey),
    };
  }
  const filterOptions = [
    generateFilterOptions("Brand", "brands", brandData?.brands.data || []),
    generateFilterOptions(
      "Ingredient",
      "ingredients",
      ingredientData?.ingredients.data || []
    ),
    generateFilterOptions(
      "Skin Condition",
      "skinConditions",
      skinConditionData?.skinConditions.data || []
    ),
  ];

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

        {filterOptions.map((filter) => (
          <SearchFilterOptions
            key={filter.title}
            title={filter.title}
            options={filter.options}
            selectedItems={filter.selectedItems}
            handleItemClick={filter.handleItemClick}
          />
        ))}
      </div>
    </>
  );
};

export default FilterOptions;
