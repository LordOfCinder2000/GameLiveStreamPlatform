import { ObjectDirective, Directive } from "vue";

declare interface ObjectDirectiveExtend<T = any, V = any>
	extends ObjectDirective {
	name?: string;
}

export const createDirective = (
	objectDirective: ObjectDirectiveExtend<HTMLElement, any>
) => <Directive<HTMLElement, any>>objectDirective;

export function getDepth(value: any) {
	if (value === false) {
		return 0;
	}
	if (value === true || value === void 0) {
		return 1;
	}

	const depth = parseInt(value, 10);
	return isNaN(depth) ? 0 : depth;
}

export function getParentProxy(proxy: any) {
	if (Object(proxy.$parent) === proxy.$parent) {
		return proxy.$parent;
	}

	let { parent } = proxy.$;

	while (Object(parent) === parent) {
		if (parent != null) {
			{
				if (Object(parent.proxy) === parent.proxy) {
					return parent.proxy;
				}

				parent = parent.parent;
			}
		}
	}
}
