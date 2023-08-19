import { parsedUrlQueryToParams } from "next/dist/server/future/route-matches/route-match";
import { ReadonlyURLSearchParams } from "next/navigation";

export function getSelectedItems(
  searchParams: ReadonlyURLSearchParams,
  paramKey: string
): string[] {
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

export const createSearchQueryUrl = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams.toString());
  if (!value || value == "[]") {
    params.delete(name);
  } else {
    params.set(name, value);
  }

  return pathname + "?" + params.toString();
};

export const createSearchQueryWithTitleUrl = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string,
  title: string
) => {
  const params = new URLSearchParams(searchParams.toString());

  // Check if the value contains square brackets
  params.set(name, value);
  params.set("title", title);

  return pathname + "?" + params.toString();
};
