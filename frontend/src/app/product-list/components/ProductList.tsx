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

  const groupContainSelectedFilters = (filters: string[]) => {
    const actualFilters = filters.filter(Boolean);

    if (actualFilters.length == 0) {
      return "";
    }
    return `and: [${actualFilters.join(",")}]`;
  };

  const createBrandFilter = (selectedBrands: string[]) => {
    if (selectedBrands.length === 0) {
      return "";
    }

    return `brand: { name: { in: ${JSON.stringify(selectedBrands)} } }`;
  };
  const createProductListQuery = (searchParams: any) => {
    const order = searchParams.get("order") || "";

    const selectedBrands = getSelectedItems(searchParams, "brands");
    const selectedSkinConditions = getSelectedItems(
      searchParams,
      "skinConditions"
    );
    const selectedIngredients = getSelectedItems(searchParams, "ingredients");

    const ingredientFilter = createContainSelectedFilter(
      selectedIngredients,
      "ingredients"
    );
    console.log(ingredientFilter);
    const skinConditionFilter = createContainSelectedFilter(
      selectedSkinConditions,
      "skin_conditions"
    );
    const filters = [
      createBrandFilter(selectedBrands),
      groupContainSelectedFilters([ingredientFilter, skinConditionFilter]),
    ]
      .filter(Boolean)
      .join(",");
    return `
      query {
          products(sort: "id${order}" ${
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
  console.log(ProductListQuery);
  const { data, isLoading, error } = useSWR(ProductListQuery, fetcher);
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
