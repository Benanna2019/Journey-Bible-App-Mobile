import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
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

const GRAPHQL_ENDPOINT = "http://localhost:4000/api/graphql";

/**
 * Creates a network request function that includes the Clerk auth token
 */
function createNetworkRequest(getToken: () => Promise<string | null>) {
  return async function makeNetworkRequest<T>(
    query: IsographOperation | IsographPersistedOperation,
    variables: unknown
  ): Promise<T> {
    if (query.kind === "PersistedOperation") {
      throw new Error("Persisted Operations are not enabled in this project.");
    }

    // Get the Clerk session token
    const token = await getToken();

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include the Bearer token if we have one
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ query: query.text, variables }),
    });

    const json = await response.json();

    if (response.ok) {
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
  };
}

/**
 * Inner layout that has access to Clerk's useAuth hook
 */
function IsographProviderWithAuth({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  const colorScheme = useColorScheme();

  const environment = useMemo(
    () =>
      createIsographEnvironment(
        createIsographStore(),
        createNetworkRequest(getToken),
        null,
        typeof window !== "undefined" ? console.log : null
      ),
    [getToken]
  );

  return (
    <IsographEnvironmentProvider environment={environment}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Suspense fallback={null}>
          {children}
          <PortalHost />
        </Suspense>
      </ThemeProvider>
    </IsographEnvironmentProvider>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <IsographProviderWithAuth>
        <Slot />
      </IsographProviderWithAuth>
    </ClerkProvider>
  );
}
