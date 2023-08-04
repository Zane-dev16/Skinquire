import Link from "next/link";
import ProductCard from "../components/ProductCard/ProductCard";
import FilterOptions from "./components/FilterOptions";
import ProductList from "./components/ProductList";
import styles from "./page.module.css";

import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

export const revalidate = 5;
const query = gql`
  query {
    products {
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
  }
`;
export default async function Page() {
  const client = getClient();
  const { data, error } = await client.query({ query });
  if (error) {
    return <div>Could not find product list</div>;
  }

  return (
    <main>
      <FilterOptions></FilterOptions>
      <div className={styles["product-list"]}>
        <ProductList></ProductList>
      </div>
    </main>
  );
}
