"use client";
import styles from "./ProductList.module.css";
import ProductCard from "@/app/components/ProductCard/ProductCard";

import Link from "next/link";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

const fetcher = (query: string) =>
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

const createProductListQuery = (searchParams: any) => {
  const order = searchParams.get("order") || "";
  console.log(order);
  return `
    query {
        products(sort: "id${order}") {
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
