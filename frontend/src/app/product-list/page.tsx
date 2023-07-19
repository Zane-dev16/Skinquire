import ProductCard from "../components/ProductCard/ProductCard";
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
  const { data } = await client.query({ query });

  return (
    <main>
      <div className={styles["product-list"]}>
        {data.products.data.map((product: any) => (
          <div>
            <ProductCard key={product.id} {...product.attributes} />
          </div>
        ))}
      </div>
    </main>
  );
}
