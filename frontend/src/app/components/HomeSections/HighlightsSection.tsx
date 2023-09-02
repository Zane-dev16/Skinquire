// pages/index.js
"use client";

import { asyncFetcher } from "@/utils/graphql";
import styles from "./HighlightsSection.module.css";
import Link from "next/link";
import { HighlightTitle, HighlightList } from "./HighlightSectionComponents";

const HighlightsSection = async () => {
  const HIGHLIGHTS_QUERY = `
  query {
  highlightSection {
    data {
      attributes {
        products {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}`;
  const data = await asyncFetcher(HIGHLIGHTS_QUERY);
  const highlights = data?.highlightSection.data.attributes.products.data || [];

  return (
    <section className={styles.highlightsSection}>
      <HighlightTitle />
      <HighlightList highlights={highlights} />
    </section>
  );
};

export default HighlightsSection;
