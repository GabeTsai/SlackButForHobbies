'use client';
import PocketBase, { RecordModel } from 'pocketbase';
import React, { createContext, useState, useEffect } from 'react';

const db = new PocketBase(process.env.NEXT_PUBLIC_HOST);
// Create the context
export const UserContext = createContext<string | null>(null);

// Context Provider Component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    console.log('UserProvider mounted'); // Log when UserProvider is mounted
    // Simulate fetching the user ID
    const fetchUserId = async () => {
      const fetchedUserId = '0247ez5vjtv47z1'; // Replace with actual user ID fetching logic
      console.log('Fetched User ID:', fetchedUserId); // Log fetched user ID
      setUserId(fetchedUserId);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    console.log('User ID in UserProvider:', userId); // Log user ID after it is set
  }, [userId]);

  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
}