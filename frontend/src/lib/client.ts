// lib/client.js
import { HttpLink } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import Cookies from "js-cookie";

export const { getClient } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: "http://127.0.0.1:1337/graphql",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: httpLink, 
  });
});
