'use client'

import React, { createContext, useContext } from 'react'
import { User, UserContextType } from '@/types/user'

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: React.ReactNode;
  initialUsers: User[];
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, initialUsers }) => {
  return <UserContext.Provider value={{ users: initialUsers }}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
