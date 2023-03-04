/* eslint-disable */

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		VUE_ROUTER_MODE: "hash" | "history" | "abstract" | undefined;
		VUE_ROUTER_BASE: string | undefined;
		BASE_URL: string;
		API_URL: string;
		AUTH_URL: string;
		OIDC_CLIENT_ID: string;
		OIDC_REDIRECT_URI: string;
		OIDC_SILENT_REDIRECT_URI: string;
		OIDC_POST_LOGOUT_REDIRECT_URI: string;
		OIDC_SCOPE: string;
		RE_CAPTCHA_SITE_KEY: string;
		XSOLLA_URL: string;
		XSOLLA_PAYSTATION_URL: string;
		COIN_SKU: string;
		COIN_DEFAULT_IMG: string;
		MANA_SKU: string;
		MANA_DEFAULT_IMG: string;
	}
}

declare const __QUASAR_SSR_SERVER__;
