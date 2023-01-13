import { h, render, computed, AppContext } from "vue";
import { watchEffect } from "vue";
export function appendFunction(
	targetFn: (...args: any[]) => any,
	appendFn: (...args: any[]) => any
) {
	const cached_function = targetFn;
	return function (...targetFnVal: any) {
		// @ts-ignore
		// eslint-disable-next-line prefer-rest-params
		const result = cached_function.apply(this, arguments);
		appendFn(...targetFnVal);
		return result;
	};
}

export function query(selector: string, parent = document) {
	return parent.querySelector(selector);
}

export function queryAll(selector: string, parent = document) {
	return Array.from(parent.querySelectorAll(selector));
}

export function addClass(target: HTMLElement, className: string) {
	return target.classList.add(className);
}

export function removeClass(target: HTMLElement, className: string) {
	return target.classList.remove(className);
}

export function hasClass(target: HTMLElement, className: string) {
	return target.classList.contains(className);
}

export function append(parent: Element, child: Element) {
	if (child instanceof Element) {
		parent.appendChild(child);
	} else {
		parent.insertAdjacentHTML("beforeend", String(child));
	}
	return parent.lastElementChild || parent.lastChild;
}

export function remove(child: HTMLElement) {
	return child.parentNode?.removeChild(child);
}

export function setStyle(element: HTMLElement, key: any, value: any) {
	element.style[key] = value;
	return element;
}

export function setStyles(
	element: HTMLElement,
	styles: Record<string, string | number>
) {
	Object.keys(styles).forEach((key) => {
		setStyle(element, key, styles[key]);
	});
	return element;
}

export function getStyle(element: HTMLElement, key: string, numberType = true) {
	const value = window.getComputedStyle(element, null).getPropertyValue(key);
	return numberType ? parseFloat(value) : value;
}

export function siblings(target: HTMLElement) {
	if (target.parentElement)
		return Array.from(target.parentElement.children).filter(
			(item) => item !== target
		);
	return [];
}

export function inverseClass(target: HTMLElement, className: string) {
	siblings(target).forEach((item) =>
		removeClass(item as HTMLElement, className)
	);
	addClass(target, className);
}

export function isInViewport(el: HTMLElement, offset = 0) {
	const rect = el.getBoundingClientRect();
	const windowHeight =
		window.innerHeight || document.documentElement.clientHeight;
	const windowWidth =
		window.innerWidth || document.documentElement.clientWidth;
	const vertInView =
		rect.top - offset <= windowHeight &&
		rect.top + rect.height + offset >= 0;
	const horInView =
		rect.left - offset <= windowWidth + offset &&
		rect.left + rect.width + offset >= 0;
	return vertInView && horInView;
}

export function includeFromEvent(event: Event, target: Element) {
	return event.composedPath && event.composedPath().indexOf(target) > -1;
}

export function replaceElement(newChild: Node, oldChild: Node) {
	oldChild.parentNode?.replaceChild(newChild, oldChild);
	return newChild;
}

export function addClassToMany(target: Element[], className: string) {
	for (let index = 0; index < target.length; index++) {
		target[index].classList.add(className);
	}
}

/**
 * @param object : object data để prop
 * @param property : property kieu array để gán default
 * @param id : property với value duy nhất để ánh xạ với data default
 * @param defaultObj : data default reactive giúp thay đổi giá trị property default của @param object
 */
export function addDefaultForDeep(
	object: any,
	property: any,
	id: any,
	defaultObj: any
) {
	// object.hasOwnProperty(property)
	if (!Object.prototype.hasOwnProperty.call(object, property)) {
		return;
	}
	Object.keys(object).some(function (key) {
		if (key === property && typeof object[key] === "object") {
			object[key].forEach((val: any) => {
				if (defaultObj[object[id]]) {
					val.default = computed(() => {
						return val[id] == defaultObj[object[id]];
					});
				}
				addDefaultForDeep(val, property, id, defaultObj);
			});
		}
	});
}

export function renderComponent({
	el,
	component,
	props,
	appContext,
	slots,
	condition = { value: true },
}: {
	el: Element;
	component: any;
	props: object;
	appContext: AppContext;
	slots: any;
	condition: any;
}) {
	let vNode;
	watchEffect(
		() => {
			if (component && condition?.value) {
				vNode = h(component, props, slots);

				vNode.appContext = { ...appContext };
				render(vNode, el);
			} else {
				render(null, el);
			}
		},
		{
			flush: "pre",
		}
	);
	return {
		destroy() {
			render(null, el);
			vNode = undefined;
		},
		vNode,
	};
}

export const objectPicker = (obj: { [key: string]: any }, ...keys: string[]) =>
	Object.fromEntries(
		keys.filter((key) => key in obj).map((key) => [key, obj[key]])
	);

import { transform, isEqual, cloneDeep } from "lodash";
export const diffProps = (obj1: object, obj2: object) => {
	const o1 = cloneDeep(obj1);
	const o2 = cloneDeep(obj2);
	return transform(o1, (result: object, value, key) => {
		if (!isEqual(value, o2[key])) {
			result[key] = value;
		}
	});
};
