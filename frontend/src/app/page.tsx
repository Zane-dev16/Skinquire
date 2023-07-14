import ProductCard from "./components/ProductCard";
import styles from "./page.module.css";

async function getData() {
  const res = await fetch("http://127.0.0.1:1337/api/products?populate=*", {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <div className={styles["product-list"]}>
        {data.data.map((product: any) => (
          <div>
            <ProductCard key={product.id} {...product.attributes} />
          </div>
        ))}
      </div>
    </main>
  );
}
