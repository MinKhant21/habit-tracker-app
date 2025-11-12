import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import AuthScreen from './auth';

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {user} = useAuth()

    const isAuthenticated = user; // Always false for this example

    if (!isAuthenticated) {
       
        return <AuthScreen />;
    }

    // CORRECT: Return the children (the main app content) only if authenticated
    return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  )
}