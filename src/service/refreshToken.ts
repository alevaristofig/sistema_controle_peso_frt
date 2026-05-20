import axios from "axios";
import { authService } from "./auth";

export const refreshToken = async () => {
  const refresh = authService.getRefreshToken();

  const response = await axios.post(
    "http://localhost:8080/oauth2/token",
    {
      grant_type: "refresh_token",
      refresh_token: refresh,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};