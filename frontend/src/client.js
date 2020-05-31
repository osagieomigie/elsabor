import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const link = new HttpLink({
  uri: "https://us-central1-elsabor-e6312.cloudfunctions.net/api",
}); // where the server is hosted at

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;
