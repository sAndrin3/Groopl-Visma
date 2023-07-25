import axios from "axios";
import { apiDomain } from "./src/Utils/Utils";
import Cookies from 'js-cookie';

export const makeRequest = axios.create({
    baseURL: `${apiDomain}`,
    withCredentials: true,
});
makeRequest.interceptors.request.use(
    (config) => {
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        config.headers["authorization"] = {accessToken};
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Axios response interceptor to handle token refresh
  makeRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        // Attempt token refresh using the refresh token if available
  
        // For example, you can call an endpoint to refresh the token and update the access token in Cookies.
        // const refreshedToken = await makeRequest.post("/refresh-token", { refreshToken: yourRefreshToken });
  
        // Update the access token in Cookies with the refreshedToken
        // Cookies.set("accessToken", refreshedToken.access_token, { expires: refreshedToken.expires_in / (60 * 60 * 24) });
  
        // Retry the original request with the new access token
        return makeRequest(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  