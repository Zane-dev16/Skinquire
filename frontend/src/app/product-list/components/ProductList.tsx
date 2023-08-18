"use client";
import styles from "./ProductList.module.css";
import ProductCard from "@/app/components/ProductCard/ProductCard";

import Link from "next/link";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import fetcher from "@/app/api/graphql";
import { getSelectedItems } from "@/utils/filterUtils";

const ProductList = () => {
  const searchParams = useSearchParams();

  const createContainSelectedFilter = (
    selectedList: string[],
    collectionName: string
  ) => {
    if (selectedList.length === 0) {
      return "";
    }
    const containSelectedFilters = selectedList.map(
      (selection) => `{${collectionName}: { name: { eq: "${selection}" } }}`
    );

    return `${containSelectedFilters.join(", ")}`;
  };

  const groupFilters = (filters: string[]) => {
    const actualFilters = filters.filter(Boolean);

    if (actualFilters.length == 0) {
      return "";
    }
    return `and: [${actualFilters.join(",")}]`;
  };

  const createBrandFilter = () => {
    const selectedBrands = getSelectedItems(searchParams, "brands");
    if (selectedBrands.length === 0) {
      return "";
    }

    return `brand: { name: { in: ${JSON.stringify(selectedBrands)} } }`;
  };
  const createSkinTypeFilter = () => {
    const selectedSkinType = searchParams.get("skinType");
    if (selectedSkinType) {
      return `or: [{skin_types: { name: { eq: "All Skin Types" } }}, {skin_types: { name: { eq: "${selectedSkinType}" } }}]`;
    }
    return "";
  };
  const createPriceFilter = (paramKey: string) => {
    const price = searchParams.get(paramKey);
    if (price) {
      return `{price: {${paramKey == "min" ? "gte" : "lte"}: ${price}}}`;
    }
    return "";
  };

  const createProductListQuery = (searchParams: any) => {
    const sortOption = searchParams.get("sort") || "id";
    const order = searchParams.get("order") || "";

    const selectedSkinConditions = getSelectedItems(
      searchParams,
      "skinConditions"
    );
    const selectedIngredients = getSelectedItems(searchParams, "ingredients");
    const selectedCategories = getSelectedItems(searchParams, "categories");

    const ingredientFilter = createContainSelectedFilter(
      selectedIngredients,
      "ingredients"
    );
    const skinConditionFilter = createContainSelectedFilter(
      selectedSkinConditions,
      "skin_conditions"
    );
    const categoryFilter = createContainSelectedFilter(
      selectedCategories,
      "categories"
    );
    const filters = [
      createBrandFilter(),
      createSkinTypeFilter(),
      groupFilters([
        categoryFilter,
        ingredientFilter,
        skinConditionFilter,
        createPriceFilter("min"),
        createPriceFilter("max"),
      ]),
    ]
      .filter(Boolean)
      .join(",");
    return `
      query {
          products(sort: "${sortOption}${order}" ${
      filters ? `filters: {${filters}}` : ""
    }) {
              data {
              id
              attributes {
                  name
                  rating
                  price
                  image {
                  data {
                      attributes {
                      url
                      }
                  }
                  }
                  brand {
                  data {
                      attributes {
                      name
                      }
                  }
                  }
              }
              }
          }
      }`;
  };
  const ProductListQuery = createProductListQuery(searchParams);
  const { data, isLoading, error } = useSWR(ProductListQuery, fetcher);
  if (error) {
    console.error(error);
    return <h1>Error: failed to connect to database</h1>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["product-list"]}>
      {data.products.data.map((product: any) => (
        <Link key={product.id} href={`/product-list/${product.id}`}>
          <ProductCard {...product.attributes} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
