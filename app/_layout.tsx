import { Stack, useRouter } from 'expo-router';
import React from 'react';
import AuthScreen from './auth';

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

    const isAuthenticated = false; // Always false for this example

    if (!isAuthenticated) {
       
        return <AuthScreen />;
    }

    // CORRECT: Return the children (the main app content) only if authenticated
    return <>{children}</>;
}

export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RouteGuard>
  )
}