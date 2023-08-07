import { parsedUrlQueryToParams } from "next/dist/server/future/route-matches/route-match";

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