import { route } from "quasar/wrappers";
import {
	createRouter,
	createMemoryHistory,
	createWebHistory,
	createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useAuthStore } from "stores/auth-store";
import { AuthService } from "boot/auth/oidc-oauth2";
import { useOidcStore } from "stores/modules/oidc-store";
import { OidcRouter } from "modules/oidc-store";
import { piniaOidcCreateRouterMiddleware } from "modules/oidc-store-pinia";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store, ssrContext }) {
	const createHistory = process.env.SERVER
		? createMemoryHistory
		: process.env.VUE_ROUTER_MODE === "history"
		? createWebHistory
		: createWebHashHistory;

	const Router = createRouter({
		scrollBehavior: () => ({ left: 0, top: 0 }),
		routes,

		// Leave this as is and make changes in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		history: createHistory(
			process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
		),
	});

	// My custom logic
	const authStore = useAuthStore(store);
	// var authService = new AuthService();

	// Router.beforeEach((to, from, next) => {
	// 	// debugger;
	// 	// if (
	// 	// 	to.matched.some((record) => record.meta.auth) &&
	// 	// 	!authStore.isSignedIn
	// 	// ) {
	// 	// 	next({ name: "home", path: "/" });
	// 	// } else {
	// 	next();
	// 	// }
	// });

	//////////////////////////////////////////
	const oidcOAuth2Store = useOidcStore(store);
	// oidcOAuth2Store.oidcCheckAccess();

	// Router.beforeEach(OidcRouter.CreatePiniaRouterMiddleware(oidcOAuth2Store));
	Router.beforeEach(piniaOidcCreateRouterMiddleware(oidcOAuth2Store));

	return Router;
});
