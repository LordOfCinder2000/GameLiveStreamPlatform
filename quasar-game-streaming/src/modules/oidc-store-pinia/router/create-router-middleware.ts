import { Store } from "../index";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const createRouter = (store: Store) => {
	return (
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		//@ts-ignore
		store["oidcCheckAccess"](to).then((hasAccess: boolean) => {
			if (hasAccess) {
				next();
			} else {
				next({ name: "error-401", path: "/401" });
			}
		});
	};
};

export default createRouter;
