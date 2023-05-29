import { QDrawer } from "quasar";

import { createDirective, getDepth, getParentProxy } from "./utils";

function closeDrawers(proxy: QDrawer, evt: Event, depth: number) {
	while (depth !== 0 && proxy !== void 0 && proxy !== null) {
		if (proxy.$options.name === "QDrawer") {
			depth--;
			proxy.hide(evt);

			continue;
		}

		proxy = getParentProxy(proxy);
	}
}

function getDrawerProxy(vnode: any) {
	return vnode.ctx.proxy;
}

export default createDirective({
	name: "close-drawer",
	beforeMount(el, { value }, vnode) {
		const ctx = {
			depth: getDepth(value),

			handler(evt: Event) {
				// allow @click to be emitted
				ctx.depth !== 0 &&
					setTimeout(() => {
						const proxy = getDrawerProxy(vnode);

						if (proxy !== void 0) {
							closeDrawers(proxy, evt, ctx.depth);
						}
					});
			},
		};

		el.__qclosedrawer = ctx;

		el.addEventListener("click", ctx.handler);
	},

	updated(el, { value, oldValue }) {
		if (value !== oldValue) {
			el.__qclosedrawer.depth = getDepth(value);
		}
	},

	beforeUnmount(el) {
		const ctx = el.__qclosedrawer;
		el.removeEventListener("click", ctx.handler);
		delete el.__qclosedrawer;
	},
});
