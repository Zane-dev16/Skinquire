import styles from "./Navbar.module.css";
import { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import { MeiliSearch } from "meilisearch";

interface Product {
  id: string;
  name: string;
}

const client = new MeiliSearch({
  host: "http://localhost:7700", // Replace with your MeiliSearch server URL
  apiKey: "Vitan1nin", // Replace with your MeiliSearch API key
});

const Navbar = () => {
  const [results, setResults] = useState<Product[]>([]);

  const searchProducts = async (query: string) => {
    try {
      const searchResponse = await client.index("products").search(query);
      setResults(searchResponse.hits);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className={styles.navbar}>
      <BurgerMenu></BurgerMenu>
      <div>
        <SearchBar onSearch={searchProducts}></SearchBar>
        <SearchResults results={results} />
      </div>
    </div>
  );
};

export default Navbar;
