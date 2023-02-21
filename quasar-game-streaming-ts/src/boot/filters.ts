import { boot } from "quasar/wrappers";
import { computed, ComputedRef } from "vue";
import sanitizeHtml from "sanitize-html";
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$filters: FilterInstance;
		$sanitize: (dirty: string) => string;
	}
}

export interface FilterInstance {
	viewCount(
		locales?: string | string[] | undefined,
		number?: number | bigint
	): string;
	fiatFormat(
		locales?: string | string[] | undefined,
		currency?: string,
		number?: number | bigint
	): string;
	virtualCurrencyBalance(
		locales?: string | string[] | undefined,
		number?: number | bigint,
		maxDisplay?: number
	): string;
	mentionHighlight(text: string): string;
}

// export interface SanitizeInstance {
// 	viewCount(
// 		locales?: string | string[] | undefined,
// 		number?: number | bigint
// 	): string;
// 	mentionHighlight(text: string): string;
// }

const sanitizeOptions: sanitizeHtml.IOptions = {
	disallowedTagsMode: "discard",
	allowedAttributes: {},
	selfClosing: [],
	// URL schemes we permit
	allowedSchemes: [],
	allowedSchemesByTag: {},
	allowedSchemesAppliedToAttributes: [],
	allowProtocolRelative: true,
	enforceHtmlBoundary: false,
};

export default boot(({ app }) => {
	// app.provide("appName", app);
	app.config.globalProperties.$filters = {
		viewCount(locale, value = 0) {
			return new Intl.NumberFormat(locale, {
				notation: "compact",
				compactDisplay: "short",
			}).format(value);
		},
		virtualCurrencyBalance(locale, value = 0, maxDisplay = 1e9) {
			if (value >= maxDisplay) {
				return new Intl.NumberFormat(locale, {
					notation: "compact",
					compactDisplay: "short",
				}).format(value);
			}
			return new Intl.NumberFormat(locale).format(value);
		},
		fiatFormat(locale, currency, value = 0) {
			return new Intl.NumberFormat(locale, {
				style: "currency",
				currency: currency,
				minimumFractionDigits: 0,
			}).format(value);
		},
		mentionHighlight(text) {
			return sanitizeHtml(text, {
				...sanitizeOptions,
				nestingLimit: 1,
				allowedTags: ["strong"],
				allowedClasses: {
					strong: ["text-positive"],
				},
				textFilter: (text, tagName) => {
					console.log(text);

					return text
						.replace(
							/@\w+/g,
							(match) =>
								`<strong class="text-positive">&nbsp;${match}&nbsp;</strong>`
						)
						.trim();
				},
			});
		},
	};

	app.config.globalProperties.$sanitize = function (dirty: string) {
		return sanitizeHtml(dirty, sanitizeOptions);
	};
});
