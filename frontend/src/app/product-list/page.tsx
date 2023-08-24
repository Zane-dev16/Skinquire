import FilterOptions from "./components/FilterOptions";
import ProductList from "./components/ProductList";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title:
    "Explore Top-Rated Skincare Products - Search, Rate and Review | Skinquire",
  description:
    "Discover a wide range of skincare products on Skinquire's product list. Our platform offers advanced search filters, sorting options, and ratings analysis, empowering you to make informed choices.",
};

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
