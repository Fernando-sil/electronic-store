import { useMutation } from "@tanstack/react-query";
import { RefreshToken } from "../../Services/Authentication";

export function useRefreshToken() {
  const { mutate: refreshToken } = useMutation({
    mutationFn: RefreshToken,
  });
  return refreshToken;
}
