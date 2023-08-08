"use client";
import styles from "./FilterOptions.module.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import Link from "next/link";
import fetcher from "@/app/api/graphql";
import useSWR from "swr";
import SearchFilterOptions from "./SearchFilterOptions";
import SingleSelectDropdown from "./SingleSelectDropdown";
import { getSelectedItems, generateQuery } from "@/utils/filterUtils";
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

  const useEntityData = (entityRequestName: string, sort: string) => {
    const { data, isLoading, error } = useSWR<{
      [key: string]: { data: Item[] };
    }>(generateQuery(entityRequestName, sort), fetcher);

    return {
      data: data?.[entityRequestName]?.data || [],
      isLoading,
      error,
    };
  };

  const productTypeData = useEntityData("productTypes", "name");
  const brandData = useEntityData("brands", "name");
  const ingredientData = useEntityData("ingredients", "name");
  const skinConditionData = useEntityData("skinConditions", "name");
  const skinTypeData = useEntityData("skinTypes", "name");
  console.log(productTypeData?.data);

  const handleItemClick = useCallback(
    (item: string, selectedItems: string[], paramKey: string) => {
      const itemIsSelected = selectedItems.includes(item);
      const newSelectedItems = itemIsSelected
        ? selectedItems.filter((selected) => selected !== item)
        : [...selectedItems, item];
      router.push(
        createSearchQueryUrl(paramKey, JSON.stringify(newSelectedItems))
      );
    },
    [searchParams, pathname, router]
  );

  const createSearchQueryUrl = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value == "[]") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    return pathname + "?" + params.toString();
  };

  if (
    brandData.error ||
    ingredientData.error ||
    skinConditionData.error ||
    skinTypeData.error
  ) {
    return <div>Error Fetching Data</div>;
  }

  if (
    brandData.isLoading ||
    ingredientData.isLoading ||
    skinConditionData.isLoading ||
    skinTypeData.isLoading
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
    generateFilterOptions(
      "Category",
      "categories",
      productTypeData?.data || []
    ),
    generateFilterOptions("Brand", "brands", brandData?.data || []),
    generateFilterOptions(
      "Ingredient",
      "ingredients",
      ingredientData?.data || []
    ),
    generateFilterOptions(
      "Skin Condition",
      "skinConditions",
      skinConditionData?.data || []
    ),
  ];

  const skinTypeOptions: string[] =
    skinTypeData?.data.map((item: Item) => item.attributes.name) || [];
  const handleSingleSelect = (selectedOption: string, paramKey: string) => {
    router.push(createSearchQueryUrl(paramKey, selectedOption));
    // Perform any further actions with the selected option
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
    router.push(createSearchQueryUrl("sort", sortParam));
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
        <Link href={createSearchQueryUrl("order", ":asc")}>
          <div className={styles.button}>ASC</div>
        </Link>
        <Link href={createSearchQueryUrl("order", ":desc")}>
          <div className={styles.button}>DESC</div>
        </Link>
      </div>

      <SingleSelectDropdown
        title="Skin Type"
        options={skinTypeOptions}
        selected={searchParams.get("skinType")}
        onSelect={(option) => handleSingleSelect(option, "skinType")}
      />
      <PriceFilter
        filterPrice={handleSingleSelect}
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
