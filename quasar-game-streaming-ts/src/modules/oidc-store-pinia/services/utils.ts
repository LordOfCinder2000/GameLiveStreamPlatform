import jwt_decode from "jwt-decode";
import { JwtClaims } from "oidc-client-ts";
export const objectAssign = <T = any>(array: any): T => {
	return array.reduce((r: T, item: any) => {
		Object.keys(item || {}).forEach((k) => {
			r[k as keyof typeof r] = item[k];
		});
		return r;
	}, {});
};

export const parseJwt = (token: string) => {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace("-", "+").replace("_", "/");
		return JSON.parse(window.atob(base64));
	} catch (error) {
		return {};
	}
};

export const firstLetterUppercase = (str: string) => {
	return str && str.length > 0
		? str.charAt(0).toUpperCase() + str.slice(1)
		: "";
};

export const camelCaseToSnakeCase = (str: string) => {
	return str
		.split(/(?=[A-Z])/)
		.join("_")
		.toLowerCase();
};

export const readParams = (
	url: string,
	responseMode: "query" | "fragment" = "query"
): URLSearchParams => {
	if (!url) throw new TypeError("Invalid URL");
	const parsedUrl = new URL(url, window.location.origin);
	const params = parsedUrl[responseMode === "fragment" ? "hash" : "search"];
	return new URLSearchParams(params.slice(1));
};

export const decode = (token: string): JwtClaims => {
	// eslint-disable-next-line no-useless-catch
	try {
		return jwt_decode<JwtClaims>(token);
	} catch (err) {
		throw err;
	}
};
