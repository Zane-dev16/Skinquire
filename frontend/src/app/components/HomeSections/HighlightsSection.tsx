// pages/index.js

import { asyncFetcher } from "@/utils/graphql";
import styles from "./HighlightsSection.module.css";
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
              image {
                data {
                    attributes {
                    url
                    }
                }
                }
            }
          }
        }
      }
    }
  }
}`;
  const data = await asyncFetcher(HIGHLIGHTS_QUERY);
  const highlights = data?.highlightSection?.data?.attributes?.products?.data;
  if (!highlights) {
    return null;
  }

  return (
    <section className={styles.highlightsSection}>
      <HighlightTitle />
      <HighlightList highlights={highlights} />
    </section>
  );
};

export default HighlightsSection;
