/* eslint-disable */

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		VUE_ROUTER_MODE: "hash" | "history" | "abstract" | undefined;
		VUE_ROUTER_BASE: string | undefined;
		BASE_URL: string | undefined;
		API_URL: string | undefined;
		AUTH_URL: string | undefined;
		OIDC_CLIENT_ID: string | undefined;
		OIDC_REDIRECT_URI: string | undefined;
		OIDC_SILENT_REDIRECT_URI: string | undefined;
		OIDC_POST_LOGOUT_REDIRECT_URI: string | undefined;
		OIDC_SCOPE: string | undefined;
		RE_CAPTCHA_SITE_KEY: string | undefined;
	}
}

declare const __QUASAR_SSR_SERVER__;
