import Cookies from "js-cookie";
import { IPessoa } from "../interfaces/pessoa/pessoa.interface";
import { IApiLinks } from "../interfaces/link/apilinks.interface";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user_data";
const URLS = "urls";

export const authService = {
    isAuthenticated: () => !!Cookies.get(TOKEN_KEY),

    getUser: (): IPessoa | null => {
        const user = Cookies.get(USER_KEY);

        return user ? JSON.parse(user) : null; 
    },

    getUrls: (): IApiLinks | null => {
        const urls = Cookies.get(URLS);

        return urls ? JSON.parse(urls) : null;
    },

    getToken: (): string | null => {
        const token = Cookies.get(TOKEN_KEY);

        return token ? token : null;
    },

    setAuth: (token: string, refresh_token: string, user: any, urls: any) => {
        Cookies.set(TOKEN_KEY,token,{ expires: 1});
        Cookies.set(REFRESH_TOKEN_KEY,refresh_token,{ expires: 1});
        Cookies.set(USER_KEY,JSON.stringify(user), { expires: 1});
        Cookies.set(URLS,JSON.stringify(urls), { expires: 1});
    },

    logout: () => {
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(USER_KEY);
    }
}