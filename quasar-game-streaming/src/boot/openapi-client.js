import { apiConfig } from "boot/axios";
import { AuthClient } from "apis";
export * from "apis";

export const authClient = new AuthClient({
	BASE: process.env.AUTH_URL,
	WITH_CREDENTIALS: apiConfig.withCredentials,
	HEADERS: apiConfig.headers,
});
