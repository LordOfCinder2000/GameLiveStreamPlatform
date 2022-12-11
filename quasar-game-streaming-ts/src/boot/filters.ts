import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$filters: FilterInstance;
	}
}

export interface FilterInstance {
	viewCount(
		locales?: string | string[] | undefined,
		number?: number | bigint
	): string;
}

export default boot(({ app }) => {
	// app.provide("appName", app);
	app.config.globalProperties.$filters = {
		viewCount(locale, value = 0) {
			return new Intl.NumberFormat(locale, {
				notation: "compact",
				compactDisplay: "short",
			}).format(value);
		},
	};
});
