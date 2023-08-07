"use client";
import styles from "./FilterOptions.module.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import Link from "next/link";
import fetcher from "@/app/api/graphql";
import useSWR from "swr";
import SearchFilterOptions from "./SearchFilterOptions";
import SingleSelectDropdown from "./SingleSelectDropdown";
import { getSelectedItems } from "@/utils/filterUtils";
import PriceFilter from "./PriceFilter";

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
  const skinTypeQuery = createQuery("skinTypes");
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
  const {
    data: skinTypeData,
    isLoading: skinTypeIsLoading,
    error: skinTypeError,
  } = useSWR<{ skinTypes: { data: Item[] } }>(skinTypeQuery, fetcher);

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
      if (!value || value == "[]") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  if (brandError || ingredientError || skinConditionError || skinTypeError) {
    return <div>Error Fetching Data</div>;
  }

  if (
    brandIsLoading ||
    ingredientIsLoading ||
    skinConditionIsLoading ||
    skinTypeIsLoading
  ) {
    return <div>Loading...</div>;
  }

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

  const skinTypeOptions: string[] =
    skinTypeData?.skinTypes.data.map((item: Item) => item.attributes.name) ||
    [];
  const handleSingleOptionSelect = (
    selectedOption: string,
    paramKey: string
  ) => {
    router.push(
      pathname + "?" + createSearchQueryString(paramKey, selectedOption)
    );
    // Perform any further actions with the selected option
  };

  const filterPrice = (paramKey: string, price: string) => {
    router.push(pathname + "?" + createSearchQueryString(paramKey, price));
  };

  const sortOptions = ["Alphabetical", "Rating", "Price", "Newly Added"];

  const sortOptionsDict = [
    { label: "Alphabetical", value: "name" },
    { label: "Rating", value: "rating" },
    { label: "Price", value: "price" },
    { label: "Newly Added", value: "createdAt" },
  ];

  // Function to get the corresponding GraphQL parameter for a given sort option
  const handleSortSelect = (selectedOption: string) => {
    const sortOption = sortOptionsDict.find(
      (option) => option.label === selectedOption
    );
    const sortParam = sortOption ? sortOption.value : "";
    router.push(pathname + "?" + createSearchQueryString("sort", sortParam));
    // Perform any further actions with the selected option
  };

  const getSortLabel = (sortValue: string | null) => {
    const sortOption = sortOptionsDict.find(
      (option) => option.value === sortValue
    );
    return sortOption ? sortOption.label : "";
  };

  return (
    <div className={styles.filterOptions}>
      <h2>Filters</h2>

      <div>
        <SingleSelectDropdown
          title="Sort By"
          options={sortOptions}
          selected={getSortLabel(searchParams.get("sort"))}
          onSelect={(option) => handleSortSelect(option)}
        />
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

      <SingleSelectDropdown
        title="Skin Type"
        options={skinTypeOptions}
        selected={searchParams.get("skinType")}
        onSelect={(option) => handleSingleOptionSelect(option, "skinType")}
      />
      <PriceFilter
        filterPrice={filterPrice}
        currentMin={searchParams.get("min")}
        currentMax={searchParams.get("max")}
      ></PriceFilter>
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
  );
};

export default FilterOptions;
