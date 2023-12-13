import "@/styles/globals.css";
import {config} from 'dotenv'
config()
import { fonts, colors } from "../../config/_disappointed";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
} from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { NavBarLayout } from "@/layouts/NavBarLayout";
import { LoginContextProvider } from "@/context/Session";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { WebSocket } from "ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { GoogleOAuthProvider } from "@react-oauth/google";

// const httpLink = createHttpLink({
//   uri: "http://127.0.0.1:4000/graphql",
// });
//"https://crm-back-x2m9.onrender.com/graphql"
//"https://mas-copas-lounge-backend.onrender.com/graphql"
const urlBackDevelopment = {
  http:"http://localhost:4000/graphql",
  ws:"ws://localhost:4000/graphql"
}
const urlBackProduction = {
  http:"https://mavicsback-dev-gfsd.4.us-1.fl0.io/graphql",
  ws:"wss://mavicsback-dev-gfsd.4.us-1.fl0.io/graphql"
}
const isDevBack = false
const theme = extendTheme({
  fonts,
  colors,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("session");
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
      "apollo-require-preflight": true,
    },
  };
}).concat(
  createUploadLink({
    uri: "http://localhost:4000/graphql",
  })
);

const wsLink = new GraphQLWsLink(
  createClient({
    webSocketImpl: WebSocket,
    url: "ws://localhost:4000/graphql",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <GoogleOAuthProvider clientId="750323481465-h69tep4i4702c0bfn5aiafq0oj6kjfn5.apps.googleusercontent.com">
          <LoginContextProvider>
            <NavBarLayout />
            <Component {...pageProps} />
          </LoginContextProvider>
        </GoogleOAuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
