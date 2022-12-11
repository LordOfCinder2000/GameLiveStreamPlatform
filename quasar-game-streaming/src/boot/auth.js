import { boot } from "quasar/wrappers";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { createAuth } from "@websanova/vue-auth";
import driverAuthBearer from "@websanova/vue-auth/dist/drivers/auth/bearer.esm.js";
import driverHttpAxios from "@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js";
import driverRouterVueRouter from "@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js";

export default boot(({ app, router }) => {
	var auth = createAuth({
		plugins: {
			http: api,
			router: router,
		},
		drivers: {
			http: driverHttpAxios,
			auth: driverAuthBearer,
			router: driverRouterVueRouter,
			// oauth2: {
			// 	google: driverOAuth2Google,
			// 	facebook: driverOAuth2Facebook,
			// },
		},
		options: {
			rolesKey: "type",
			notFoundRedirect: { name: "user-account" },
			authRedirect: {
				path: "/",
			},
			loginData: {
				url: "/api/account/login",
			},
			fetchData: {
				url: "/api/account/my-profile",
			},
		},
	});

	app.use(auth);

	return auth;
});
