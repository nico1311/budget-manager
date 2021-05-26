import React, { createContext } from 'react';

type User = {
  id: number,
  email: string,
  name: string,
  balance: number
};

type UserContextType = {
  user?: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | any>>
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
