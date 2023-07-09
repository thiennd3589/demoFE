import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

export const BASE_URL = "http://localhost:8080";

export enum REQUEST_METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export function configAxios<INPUT>(
  url: string,
  method: REQUEST_METHOD,
  params?: INPUT,
  baseURL?: string,
  tokenRequired?: boolean,
  token?: string,
  data?: INPUT
): AxiosRequestConfig {
  return tokenRequired || token
    ? {
        url,
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? getToken()}`,
        },
        params,
        baseURL: baseURL ? baseURL : BASE_URL,
        data,
      }
    : {
        url,
        method,
        headers: {
          "Content-Type": "application/json",
        },
        params,
        baseURL: baseURL ? baseURL : BASE_URL,
        data,
      };
}

export async function query<INPUT, OUTPUT>({
  url,
  method,
  params,
  baseURL,
  tokenRequired,
  token,
  data,
}: {
  url: string;
  method: REQUEST_METHOD;
  params?: INPUT;
  baseURL?: string;
  tokenRequired?: boolean;
  token?: string;
  data?: any;
}) {
  const config: AxiosRequestConfig = configAxios(
    url,
    method,
    params,
    baseURL,
    tokenRequired,
    token,
    data
  );

  try {
    const response: AxiosResponse<OUTPUT> = await axios(config);
    return response;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401 && url !== "/login") {
      console.log(error);
      // window.localStorage.clear();
      // window.location.replace("/login");
    }
    throw error;
  }
}

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
