import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

const QUERY_PRODUCTS = gql`
  query {
    products {
      data {
        id
      }
    }
  }
`;

const QUERY_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      description
      rating
    }
  }
`;

export async function generateStaticParams() {
  const client = getClient();
  const { data } = await client.query({ query: QUERY_PRODUCTS });

  return data.products.data.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: number } }) {
  const client = getClient();
  const { data } = await client.query({ query: QUERY_PRODUCT_BY_ID });

  return (
    <main>
      <h3>{data.data.attributes.name}</h3>
      <div></div>
    </main>
  );
}
