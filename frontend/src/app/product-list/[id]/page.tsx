import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import Head from "next/head";
import RatingButton from "./components/rating/RatingButton";
import Link from "next/link";

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
      data {
        id
        attributes {
          name
          description
          rating
          price
          brand {
            data {
              attributes {
                name
              }
            }
          }
          ingredients {
            data {
              attributes {
                name
              }
            }
          }
          skin_conditions {
            data {
              attributes {
                condition
              }
            }
          }
          skin_types {
            data {
              attributes {
                type
              }
            }
          }
          image {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`;

export async function generateStaticParams() {
  const client = getClient();
  const { data, error } = await client.query({ query: QUERY_PRODUCTS });

  if (error) {
    console.error("failed to get product (static params)");
  }
  return data.products.data.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: number } }) {
  const client = getClient();
  const { data, error } = await client.query({
    query: QUERY_PRODUCT_BY_ID,
    variables: { id: params.id },
  });
  if (error || !data?.product.data) {
    console.error("failed to get product by id");
    return <div>error: product not found</div>;
  }

  const product = data.product.data.attributes;
  const imageUrl = product.image?.data?.attributes.formats.thumbnail.url;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <div>
      <Head>
        <title>{product.name} - Your Website Name</title>
        <meta name="description" content={product.description} />
        {/* Other meta tags, OG tags, etc. */}
      </Head>

      <h1>{product.name}</h1>
      <img
        src={`${backendUrl}${imageUrl}`}
        alt={`${product.name} product image`}
      />
      <p>{product.description}</p>

      {/* Product details */}
      <div>
        <p>Brand: {product.brand.data.attributes.name}</p>
        <p>Rating: {product.rating}</p>
        <p>
          Ingredients:{" "}
          {product.ingredients.data
            .map((ingredient) => ingredient.attributes.name)
            .join(", ")}
        </p>
        <p>Type: {product.productType}</p>
        <p>Price: {product.price}</p>
        <p>
          Skin Condition:{" "}
          {product.skin_conditions.data
            .map((condition) => condition.attributes.condition)
            .join(", ")}
        </p>
        <p>
          Skin Type:{" "}
          {product.skin_types.data
            .map((type) => type.attributes.type)
            .join(", ")}
        </p>
      </div>
      <RatingButton></RatingButton>
    </div>
  );
}
