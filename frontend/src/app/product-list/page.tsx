import FilterOptions from "./components/FilterOptions";
import ProductList from "./components/ProductList";
import styles from "./page.module.css";

export default async function Page() {
  return (
    <main>
      <div className={styles.pageContainer}>
        <FilterOptions></FilterOptions>
        <div>
          <ProductList></ProductList>
        </div>
      </div>
    </main>
  );
}
