"use client";
import styles from "./ProductList.module.css";
import ProductCard from "@/app/components/ProductCard/ProductCard";

import Link from "next/link";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import fetcher from "@/app/api/graphql";

const createProductListQuery = (searchParams: any) => {
  const order = searchParams.get("order") || "";
  const retrievedBrandsParam = searchParams.get("brands");

  let selectedBrands: string[] = [];
  if (retrievedBrandsParam) {
    // Parse the JSON string to get back the array
    selectedBrands = JSON.parse(retrievedBrandsParam);
  }

  const brandFilter =
    selectedBrands.length > 0
      ? `filters: {brand: { name: { in: ${JSON.stringify(selectedBrands)} } }}`
      : "";
  console.log(selectedBrands);
  return `
    query {
        products(sort: "id${order}" ${brandFilter}) {
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

const ProductList = () => {
  const searchParams = useSearchParams();
  const ProductListQuery = createProductListQuery(searchParams);
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
