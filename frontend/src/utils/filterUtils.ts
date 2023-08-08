import { parsedUrlQueryToParams } from "next/dist/server/future/route-matches/route-match";
import { ReadonlyURLSearchParams } from "next/navigation";

export function getSelectedItems(searchParams: any, paramKey: string): string[] {
    const retrievedItemsParam = searchParams.get(paramKey);
    if (retrievedItemsParam) {
      const selectedItemsList = JSON.parse(retrievedItemsParam);
      if (Array.isArray(selectedItemsList)) {
        return selectedItemsList;
      }
    }
    return [];
  }

  interface Item {
    attributes: {
      name: string;
    };
  }

export function generateFilterOptions(
    title: string,
    data: Item[],
    paramKey: string,
    selectedItems: string[]
    
  ) {
    return {
      title: title,
      options: data.map((item: Item) => item.attributes.name),
      selectedItems: selectedItems,
      paramKey: paramKey,
    };
  }

export const generateQuery = (entityRequestName: string, sort: string) => `
query {
  ${entityRequestName}(sort: "${sort}") {
    data {
      attributes {
        name
      }
    }
  }
}
`;