import React, { createContext } from 'react';

type User = {
  id: number,
  email: string,
  name: string,
  balance: number
}

type UserContext = {
  user?: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | any>>
}

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {}
});
