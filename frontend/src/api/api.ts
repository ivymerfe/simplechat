import axios from "axios";
import TokenService from "./token";

const axiosInstance = axios.create({
    baseURL: "/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = TokenService.getAccessToken();
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        // Access Token was expired
        if (err.response && err.response.status === 401 && !originalConfig._retry && TokenService.getRefreshToken()) {
            originalConfig._retry = true;
            try {
                const rs = await axiosInstance.post("/auth/token/refresh/", {
                    refresh: TokenService.getRefreshToken(),
                });
                TokenService.setAccessToken(rs.data.access);
                return axiosInstance(originalConfig);
            } catch (_error) {
                TokenService.setAccessToken(null);
                TokenService.setRefreshToken(null);
                return Promise.reject(_error);
            }
        }
        return Promise.reject(err);
    }
);

export default axiosInstance;
