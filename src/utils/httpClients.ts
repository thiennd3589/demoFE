import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

export const BASE_URL = "http://192.168.0.101:8080";
export const BASE_WSS = "http://192.168.0.101:8081";

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
  data?: INPUT,
  contentType?: string
): AxiosRequestConfig {
  return tokenRequired || token
    ? {
        url,
        method,
        headers: {
          "Content-Type": contentType ?? "application/json",
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
          "Content-Type": contentType ?? "application/json",
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
  contentType,
}: {
  url: string;
  method: REQUEST_METHOD;
  params?: INPUT;
  baseURL?: string;
  tokenRequired?: boolean;
  token?: string;
  data?: any;
  contentType?: string;
}) {
  const config: AxiosRequestConfig = configAxios(
    url,
    method,
    params,
    baseURL,
    tokenRequired,
    token,
    data,
    contentType
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
