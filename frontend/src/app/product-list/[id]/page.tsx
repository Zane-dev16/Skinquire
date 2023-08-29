import Head from "next/head";
import RatingButton from "./components/rating/RatingButton";
import { asyncFetcher } from "@/utils/graphql";
import { Metadata, ResolvingMetadata } from "next";

interface Relation {
  attributes: {
    name: string;
  };
}

type Props = {
  params: { id: number };
};

export async function generateStaticParams() {
  const data = await asyncFetcher("query {products {data {id }}}");
  if (data?.products.data.map) {
    return data.products.data.map((product: { id: number }) => ({
      id: product.id.toString(),
    }));
  } else {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const QUERY_PRODUCT_BY_ID = createProductQuery(params.id);
  const data = await asyncFetcher(QUERY_PRODUCT_BY_ID);
  const product = data.product.data.attributes;
  const imageUrl = product.image?.data?.attributes.formats.thumbnail?.url;
  return {
    title: `${product.name} - Skinquire`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Skinquire`,
      description: product.description,
      url: `https://www.skinquire.net/product-list/${data.product.data.id}`,
      siteName: "Skinquire",
      images: [
        {
          url: `${imageUrl}`,
          width: 200,
          height: 300,
          alt: `${product.name} image`,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} - Skinquire`,
      description: product.description,
      images: {
        url: `${imageUrl}`,
        width: 200,
        height: 300,
        alt: `${product.name} image`,
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const QUERY_PRODUCT_BY_ID = createProductQuery(params.id);
  const data = await asyncFetcher(QUERY_PRODUCT_BY_ID);

  const product = data.product.data.attributes;
  const imageUrl = product.image?.data?.attributes.formats.thumbnail?.url;
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "";

  return (
    <div>
      <h1>{product.name}</h1>
      <a href={`${product.links}`}>BUY NOW ON AMAZON</a>
      <img
        src={`${mediaUrl}${imageUrl}`}
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

const createProductQuery = (id: number) => {
  return `
  query {
    product(id: ${id}) {
      data {
        id
        attributes {
          name
          description
          rating
          price
          links
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
};

const createProductMetadataQuery = (id: number) => {
  return `
  query {
    product(id: ${id}) {
      data {
        id
        attributes {
          name
          description
          rating
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
};
