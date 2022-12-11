import jwt_decode from "jwt-decode";
import { JwtClaims } from "oidc-client-ts";
export type PayloadType = string | { [key: string]: any };

export const OidcUtils = {
	ObjectAssign: (objects: any[]) => {
		return objects.reduce(function (
			r: { [x: string]: any },
			o: { [x: string]: any }
		) {
			Object.keys(o || {}).forEach(function (k) {
				r[k] = o[k];
			});
			return r;
		},
		{});
	},
	ParseJwt: (token: string) => {
		try {
			const base64Url = token.split(".")[1];
			const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
			const jsonPayload = decodeURIComponent(
				atob(base64)
					.split("")
					.map(function (c) {
						return (
							"%" +
							("00" + c.charCodeAt(0).toString(16)).slice(-2)
						);
					})
					.join("")
			);
			return JSON.parse(jsonPayload);
		} catch (error) {
			return {};
		}
	},
	PayloadItem: (payload: PayloadType, option: string): any => {
		if (payload) {
			if (typeof payload === "string") {
				return payload;
			} else {
				if (option in payload) {
					if (payload.option) return option;
				}
			}
		}
		return null;
	},
	ErrorPayload: (context: string, error: Error): PayloadType => {
		return {
			context,
			error: error && error.message ? error.message : error,
		};
	},
	FirstLetterUppercase: (string: string) => {
		return string && string.length > 0
			? string.charAt(0).toUpperCase() + string.slice(1)
			: "";
	},
	ReadParams: (
		url: string,
		responseMode: "query" | "fragment" = "query"
	): URLSearchParams => {
		if (!url) throw new TypeError("Invalid URL");
		const parsedUrl = new URL(url, window.location.origin);
		const params =
			parsedUrl[responseMode === "fragment" ? "hash" : "search"];
		return new URLSearchParams(params.slice(1));
	},
	Decode: (token: string): JwtClaims => {
		// eslint-disable-next-line no-useless-catch
		try {
			return jwt_decode<JwtClaims>(token);
		} catch (err) {
			throw err;
		}
	},
};
