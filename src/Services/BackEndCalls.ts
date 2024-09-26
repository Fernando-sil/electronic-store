import { BaseURl } from "../Constants";
import { TLoginResponse } from "../Types/AuthenticationTypes";
import {
  TFetchMethod,
  TGenericGetMultiple,
  TGenericUpdate,
  TResponse,
  TResponseWithCount,
} from "../Types/Types";

export function GetUserSession(): TLoginResponse {
  return JSON.parse(sessionStorage.getItem("user")!);
}
export function SetUserSession<T>(data: T) {
  return sessionStorage.setItem("user", JSON.stringify(data));
}

export async function postData<T>(url: string, body: string) {
  const result = await fetch(`${url}`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(body),
  });
  if (result.status == 404) {
    throw new Error("Not found");
  }
  const data: T = await result.json();

  return data;
}

export async function RefreshToken(token: string) {
  const refresh = await postData<TResponse<TLoginResponse>>(
    `${BaseURl}Auth/refresh-token`,
    token
  );

  return refresh;
}

export async function RetryAfterTokenRefresh<T>(
  url: string,
  token: string,
  body: T,
  method: TFetchMethod
) {
  const result = await fetch(`${url}`, {
    method: method,
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `bearer ${token}`,
    },
    body: body === "" ? undefined : JSON.stringify(body),
  });
  return result;
}

export async function fetchDataWithCredentials<T>(
  url: string,
  method: TFetchMethod = "GET",
  body: T | string = "",
  accessToken: string = ""
) {
  const UserSession = GetUserSession();
  const userToken = UserSession?.token;
  const token = accessToken === "" ? userToken : accessToken;

  let result: Response;
  result = await fetch(`${url}`, {
    method: method,
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",

      Authorization: `${token !== undefined && `bearer ${token}`}`,
    },
    body: body === "" ? undefined : JSON.stringify(body),
  });
  const status = result.status;

  if (status === 401 && token !== undefined) {
    const refresh = await RefreshToken(token);

    if (refresh.success) {
      SetUserSession(refresh.data);
      result = await RetryAfterTokenRefresh(
        url,
        refresh.data.token,
        body,
        method
      );
    }
  }
  const data = await result.json();

  return data;
}

export async function GenericUpdate(
  body: TGenericUpdate,
  id: number,
  field: string
): Promise<TResponse<TGenericGetMultiple>> {
  const url = `http://localhost:5211/api/${field}/${id}`;
  const result = await fetchDataWithCredentials(url, "PUT", body);
  return result;
}

export async function GenericGetMultiple(
  field: string
): Promise<TResponseWithCount<TGenericGetMultiple[]>> {
  const url = `http://localhost:5211/api/${field}`;
  const result = await fetchDataWithCredentials(url);
  return result;
}

export async function GenericAddMultiple<T>(
  body: T[],
  field: string
): Promise<TResponseWithCount<TGenericGetMultiple[]>> {
  const url = `http://localhost:5211/api/${field}`;
  const result = await fetchDataWithCredentials(url, "POST", body);
  return result;
}

export async function GenericDelete(field: string) {
  const url = `http://localhost:5211/api/${field}`;
  const result = await fetchDataWithCredentials(url, "DELETE");
  return result;
}
