
class TokenService {
    static getRefreshToken() {
        return localStorage.getItem("refreshToken");
    }

    static setRefreshToken(token: string | null) {
        if (!token) {
            localStorage.removeItem("refreshToken");
        } else {
            localStorage.setItem("refreshToken", token);
        }
    }
  
    static getAccessToken() {
        return localStorage.getItem("accessToken");
    }
  
    static setAccessToken(token: string | null) {
        if (!token) {
            localStorage.removeItem("accessToken");
        } else {
            localStorage.setItem("accessToken", token);
        }
    }
}
  
export default TokenService;
