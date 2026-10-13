import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

// Cookie keys
export const ACCESS_TOKEN_KEY = "tibyan_access_token";
export const REFRESH_TOKEN_KEY = "tibyan_refresh_token";

// Base API URL - replace with your actual backend URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - attach token + language
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Detect locale from URL path or fallback to cookie/default
    const locale =
      Cookies.get("NEXT_LOCALE") ||
      (typeof window !== "undefined"
        ? window.location.pathname.split("/")[1]
        : "en") ||
      "en";

    if (config.headers) {
      config.headers["Accept-Language"] = locale;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle refresh token on 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

      if (!refreshToken) {
        // No refresh token — clear everything and reject
        Cookies.remove(ACCESS_TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);
        isRefreshing = false;

        // Redirect to login
        if (typeof window !== "undefined") {
          window.location.href = `/${Cookies.get("NEXT_LOCALE") || "en"}/auth/login`;
        }
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;

        Cookies.set(ACCESS_TOKEN_KEY, newAccessToken, {
          secure: true,
          sameSite: "strict",
        });
        Cookies.set(REFRESH_TOKEN_KEY, newRefreshToken, {
          secure: true,
          sameSite: "strict",
        });

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        Cookies.remove(ACCESS_TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);

        if (typeof window !== "undefined") {
          window.location.href = `/${Cookies.get("NEXT_LOCALE") || "en"}/auth/login`;
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
