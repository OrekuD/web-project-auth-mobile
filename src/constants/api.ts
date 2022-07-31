import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { REACT_APP_API_URL } from "@env";

const interceptorResponseFn = (
  response: AxiosResponse<any>
): AxiosResponse<any> => response;

const interceptorErrorFn = (error: any) => {
  if (error.response) {
    const status = error?.response.status;
    // console.error(error.response);

    if (status === 422) {
      return Promise.reject({
        status,
        list: [{ msg: "Unprocessable Entity" }]
      });
    }

    if (status === 401) {
      return Promise.reject({
        status,
        list: [{ msg: "Unauthorized" }]
      });
    }

    if (status === 400) {
      if ("data" in error.response && "validation" in error.response.data) {
        return Promise.reject({
          status,
          list: [{ msg: error.response.data.validation.body.message }]
        });
      }

      return Promise.reject({
        status,
        list: [{ msg: "Bad Request" }]
      });
    }

    if (status === 403) {
      return Promise.reject({
        status,
        list: [{ msg: "Forbidden" }]
      });
    }

    const response = {
      status: error.response.status,
      list: error.response.data.errors
    };
    return Promise.reject(response);
  } else {
    const response = {
      status: 500,
      list: [{ msg: "Something went wrong." }]
    };
    return Promise.reject(response);
  }
};

class API {
  private readonly BASE_URL: string = `${REACT_APP_API_URL}/api/v1`;
  private readonly guestAxiosInstance: AxiosInstance;
  private readonly axiosInstance: AxiosInstance;
  private isAuthenticated: boolean = false;

  constructor() {
    const config: AxiosRequestConfig = { baseURL: this.BASE_URL };
    this.axiosInstance = axios.create(config);
    this.axiosInstance.interceptors.response.use(
      interceptorResponseFn,
      interceptorErrorFn
    );

    this.guestAxiosInstance = axios.create(config);
    this.guestAxiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>): AxiosResponse<any> => response,
      interceptorErrorFn
    );
  }

  public addAccessToken = (token?: string) => {
    if (token) {
      this.isAuthenticated = true;
      this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      this.isAuthenticated = false;
    }
  };

  public removeAccessToken = () => {
    this.isAuthenticated = false;
    delete this.axiosInstance.defaults.headers.common.Authorization;
  };

  public url = (path: string) => {
    if (path.startsWith("/")) {
      return `${this.BASE_URL}${path}`;
    } else {
      return `${this.BASE_URL}/${path}`;
    }
  };

  public get authenticatedClient() {
    return this.axiosInstance;
  }

  public get client() {
    if (this.isAuthenticated) {
      return this.axiosInstance;
    }

    return this.guestAxiosInstance;
  }
}

export default new API();
