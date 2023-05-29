import { defineStore } from "pinia";
import { apiClient } from "boot/openapi-client";
export const useReCaptchaStore = defineStore("recaptcha-store", {
	state: () => ({
		recaptchaValid: false,
		sitekey: process.env.RE_CAPTCHA_SITE_KEY,
	}),
	getters: {},
	actions: {
		async validateReCaptchaToken(token: string, ip?: string) {
			await apiClient.reCaptcha.validateReCaptchaToken(token).then(() => {
				this.recaptchaValid = true;
			});
		},
	},
});
