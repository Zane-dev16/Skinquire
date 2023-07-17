export async function generateStaticParams() {
  const res = await fetch("http://127.0.0.1:1337/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return products.data.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

async function getData(id: number) {
  const res = await fetch(`http://127.0.0.1:1337/api/products/${id}`, {});

  if (!res.ok) {
    console.log(id);
    throw new Error(`Failed to fetch data`);
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: number } }) {
  const data = await getData(params.id);

  return <main>{data.data.attributes.name}</main>;
}
