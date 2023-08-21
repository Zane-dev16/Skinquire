import Head from "next/head";
import RatingButton from "./components/rating/RatingButton";
import { asyncFetcher } from "@/utils/graphql";

interface Relation {
  attributes: {
    name: string;
  };
}

/* export async function generateStaticParams() {
  const data = await asyncFetcher("query {products {data {id }}}");
  if (data?.product.data.map) {
    return data.products.data.map((product: { id: number }) => ({
      id: product.id.toString(),
    }));
  } else {
    return [];
  }
} */

export default async function Page({ params }: { params: { id: number } }) {
  const QUERY_PRODUCT_BY_ID = `
  query {
    product(id: ${params.id}) {
      data {
        id
        attributes {
          name
          description
          rating
          price
          categories {
            data {
              attributes {
                name
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
                  name
              }
            }
          }
          skin_types {
            data {
              attributes {
                    name
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
  const data = await asyncFetcher(QUERY_PRODUCT_BY_ID);

  const product = data.product.data.attributes;
  const imageUrl = product.image?.data?.attributes.formats.thumbnail.url;
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL;

  return (
    <div>
      <Head>
        <title>{product.name} - Your Website Name</title>
        <meta name="description" content={product.description} />
        {/* Other meta tags, OG tags, etc. */}
      </Head>

      <h1>{product.name}</h1>
      <img src={`${imageUrl}`} alt={`${product.name} product image`} />
      <p>{product.description}</p>

      {/* Product details */}
      <div>
        <p>Brand: {product.brand.data.attributes.name}</p>
        <p>Rating: {product.rating}</p>
        <p>
          Ingredients:{" "}
          {product.ingredients.data
            .map((ingredient: Relation) => ingredient.attributes.name)
            .join(", ")}
        </p>
        <p>
          Categories:{" "}
          {product.categories.data
            .map((category: Relation) => category.attributes.name)
            .join(", ")}
        </p>
        <p>Price: {product.price}</p>
        <p>
          Skin Condition:
          {product.skin_conditions.data
            .map((condition: Relation) => condition.attributes.name)
            .join(", ")}
        </p>
        <p>
          Skin Type:{" "}
          {product.skin_types.data
            .map((type: Relation) => type.attributes.name)
            .join(", ")}
        </p>
      </div>
      <RatingButton product={params.id}></RatingButton>
    </div>
  );
}
