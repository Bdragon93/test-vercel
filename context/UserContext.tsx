'use client';

import React, { createContext, useContext, useState } from 'react';
import { User } from '@/types';

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
  initialUsers: User[];
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  return <UserContext.Provider value={{ users, setUsers }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
