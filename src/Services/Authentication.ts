import {
  TLogin,
  TLoginResponse,
  TUpdateUSer,
  TUsers,
} from "../Types/AuthenticationTypes";
import { TResponse, TResponseWithCount } from "../Types/Types";
import { fetchDataWithCredentials } from "./BackEndCalls";

export async function LogIn(
  credentials: TLogin
): Promise<TResponse<TLoginResponse>> {
  const url = `http://localhost:5211/api/Auth/login`;
  const request = await fetchDataWithCredentials(url, "POST", credentials);

  return request;
}

export async function GetAllUsers(
  name?: string
): Promise<TResponseWithCount<TUsers[]>> {
  const baseUrl = "http://localhost:5211/api/Auth/users";
  const url =
    name === undefined || name === "" ? baseUrl : `${baseUrl}?name=${name}`;
  const data = await fetchDataWithCredentials(url);
  return data;
}

export async function LogUserOut(): Promise<TResponse<string>> {
  const url = "http://localhost:5211/api/Auth/logout";
  const result = await fetchDataWithCredentials(url, "POST");
  return result;
}

export async function GetUser(id: string): Promise<TResponse<TLoginResponse>> {
  const url = `http://localhost:5211/api/Auth/${id}`;
  const result = await fetchDataWithCredentials(url);
  return result;
}

export async function UpdateUser(
  id: string,
  body: TUpdateUSer
): Promise<TResponse<TLoginResponse>> {
  const url = `http://localhost:5211/api/Auth/${id}/update-user`;
  const result = await fetchDataWithCredentials(url, "PUT", body);
  return result;
}

export async function RefreshToken(): Promise<TResponse<TLoginResponse>> {
  const url = "http://localhost:5211/api/Auth/refresh-token";
  const result = await fetchDataWithCredentials(url, "POST");
  return result;
}
