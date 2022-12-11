<template>
	<VueRecaptcha
		ref="recaptcha"
		@expired="expiredReCaptcha"
		@error="errorReCaptcha"
		@verify="verifyReCaptcha"
		:sitekey="state.sitekey || ''"
	>
	</VueRecaptcha>
</template>

<script setup lang="ts">
import { VueRecaptcha } from "vue-recaptcha";
import { authClient } from "boot/openapi-client";
import { useReCaptchaStore } from "stores/components/recaptcha-store";
import { axios } from "boot/axios";

const emit = defineEmits(["verifyRecaptchaSuccess", "receiveRecaptchaToken"]);
const state = useReCaptchaStore();

const verifyReCaptcha = async (token: string) => {
	console.log("re-captcha-token: ", token);
	emit("receiveRecaptchaToken");
	// await axios
	// 	.get("https://api.ipify.org/?format=json")
	// 	.then(async ({ data }) => {
	// 		console.log("IP: ", data.ip);
	// 		await validateReCaptchaToken(token, data.ip);
	// 	})
	// 	.catch(async (err) => {
	// 		console.log("IP: ", err);
	// 		await validateReCaptchaToken(token);
	// 	});
	await validateReCaptchaToken(token);
};

const validateReCaptchaToken = async (token: string, ip?: string) => {
	await state
		.validateReCaptchaToken(token)
		.then((succ) => {
			console.log("Success: ", succ);

			// state.recaptchaValid = true;
			emit("verifyRecaptchaSuccess");
		})
		.catch((err) => {
			console.log("Error: ", err?.body?.error?.message);
		});
};

const expiredReCaptcha = () => {
	console.log("expiredReCaptcha");
	state.recaptchaValid = false;
};

const errorReCaptcha = () => {
	console.log("errorReCaptcha");
	state.recaptchaValid = false;
};
</script>
