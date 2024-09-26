import { createContext, Dispatch, SetStateAction, useState } from "react";

export type TTokenContext = {
  token: string | null | undefined;
  setToken: Dispatch<SetStateAction<string | null | undefined>>;
};

const TokenContext = createContext<TTokenContext | null>({
  token: null,
  setToken: () => null,
});

function TokenProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null | undefined>();

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export { TokenProvider, TokenContext };
