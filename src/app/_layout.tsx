import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { PortalHost } from "@rn-primitives/portal"
import {
  createIsographEnvironment,
  createIsographStore,
  IsographEnvironmentProvider,
  IsographOperation,
  IsographPersistedOperation,
} from "@isograph/react";
import { useMemo, Suspense } from 'react';
import "../../global.css"


import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(home)',
};

function makeNetworkRequest<T>(
  query: IsographOperation | IsographPersistedOperation,
  variables: unknown
): Promise<T> {
  if (query.kind === "PersistedOperation") {
    throw new Error("Persisted Operations are not enabled in this project.");
  }

  const queryText = query.text;

  // replacing with my local host graphql api to see if I can get it to work
  const promise = fetch("http://localhost:8080/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: queryText, variables }),
  }).then(async (response) => {
    const json = await response.json();

    if (response.ok) {
      /**
       * Enforce that the network response follows the specification:: {@link https://spec.graphql.org/draft/#sec-Errors}.
       */
      if (Object.hasOwn(json, "errors")) {
        if (!Array.isArray(json.errors) || json.errors.length === 0) {
          throw new Error("GraphQLSpecificationViolationError", {
            cause: json,
          });
        }
        throw new Error("GraphQLError", {
          cause: json.errors,
        });
      }
      return json;
    }
    throw new Error("NetworkError", {
      cause: json,
    });
  });
  return promise;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const environment = useMemo(
    () =>
      createIsographEnvironment(
        createIsographStore(),
        makeNetworkRequest,
        null,
        typeof window != "undefined" ? console.log : null
      ),
    []
  );

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <IsographEnvironmentProvider environment={environment}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Suspense fallback={<div>Loading Pokemon...</div>}>
            <Slot />
            <PortalHost />
          </Suspense>
        </ThemeProvider>
      </IsographEnvironmentProvider>
    </ClerkProvider>
  );
}
