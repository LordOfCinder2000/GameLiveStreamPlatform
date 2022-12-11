import { route } from "quasar/wrappers";
import {
	createRouter,
	createMemoryHistory,
	createWebHistory,
	createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useAuthStore } from "stores/auth-store";
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

export default route(function ({ store }) {
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
		history: createHistory(process.env.VUE_ROUTER_BASE),
	});

	const oidcOAuth2Store = useOidcStore(store);

	//@ts-ignore
	// Router.beforeEach(OidcRouter.CreatePiniaRouterMiddleware(oidcOAuth2Store));
	//un comment
	Router.beforeEach(piniaOidcCreateRouterMiddleware(oidcOAuth2Store));

	return Router;
});
