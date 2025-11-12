import { createContext, useContext, useEffect, useState } from "react";
// Assuming 'react-native-appwrite' exports necessary types and Appwrite client
import { ID, Models } from "react-native-appwrite"; 
// Assuming './appwrite' exports an initialized Appwrite Account service instance
// Note the updated path to "@/lib/appWrite"
import { account } from "@/lib/appWrite"; 

// --- TYPE DEFINITIONS ---
type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

let AuthContext = createContext<any | undefined>(undefined);

// --- AUTH PROVIDER COMPONENT ---
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  // Helper to fetch the current user/session
  const getUser = async () => {
    try {
      // account.get() returns the current user model if a session exists
      const session = await account.get(); 
      setUser(session);
    } catch (error) {
      // If no session is found, account.get() throws an error
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    // Attempt to retrieve the current user/session on mount
    getUser();
  }, []);

  // Defined signIn FIRST so signUp can call it reliably
  const signIn = async (email: string, password: string) => {
    try {
      // 1. Create the email/password session
      await account.createEmailPasswordSession(email, password);
      // 2. Fetch the newly created session/user and update state
      await getUser(); 
      return null; // Success, return null error
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An error occured during sign in";
    }
  }; // <-- ADDED SEMICOLON


  const signUp = async (email: string, password: string) => {
    try {
      // 1. Create the user account with a unique ID
      await account.create(ID.unique(), email, password);
      // 2. Log them in immediately after creation
      const signInError = await signIn(email, password); 
      
      // Return any error that occurred during the immediate sign-in step
      return signInError; 

    } catch (error) {
      if (error instanceof Error) {
        return error.message; 
      }
      return "An error occured during signup";
    }
  }; // <-- ADDED SEMICOLON
  
  const signOut = async () => {
    try {
      // Delete the current active session
      await account.deleteSession("current"); 
      setUser(null);
    } catch (error) {
      console.log("Appwrite Sign out error:", error);
    }
  }; // <-- ADDED SEMICOLON

  // The rendering block starts here. Check for correct syntax on the return statement.
  return ( 
      <AuthContext.Provider value={{ user, isLoadingUser, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// --- AUTH HOOK ---
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside of the AuthProvider");
  }

  return context;
}