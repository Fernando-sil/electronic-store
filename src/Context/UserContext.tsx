import { createContext, useEffect, useState } from "react";
import { TLoginResponse } from "../Types/AuthenticationTypes";

export type TCreateContext = {
  user: TLoginResponse | null;
  setUser: (user: TLoginResponse) => void;
};

const initialState: TLoginResponse = {
  id: "",
  userName: "",
  emailAddress: "",
  confirmedEmail: false,
  role: "",
  isActive: true,
  token: "",
};

const UserContext = createContext<TCreateContext>({
  user: null,
  setUser: () => null,
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    if (user.userName === "") return;
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const currentUser: TLoginResponse = JSON.parse(
      sessionStorage.getItem("user")!
    );
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
