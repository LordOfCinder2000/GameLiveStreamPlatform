import { h, render, computed } from "vue";

export function query(selector, parent = document) {
	return parent.querySelector(selector);
}

export function queryAll(selector, parent = document) {
	return Array.from(parent.querySelectorAll(selector));
}

export function addClass(target, className) {
	return target.classList.add(className);
}

export function removeClass(target, className) {
	return target.classList.remove(className);
}

export function hasClass(target, className) {
	return target.classList.contains(className);
}

export function append(parent, child) {
	if (child instanceof Element) {
		parent.appendChild(child);
	} else {
		parent.insertAdjacentHTML("beforeend", String(child));
	}
	return parent.lastElementChild || parent.lastChild;
}

export function remove(child) {
	return child.parentNode.removeChild(child);
}

export function setStyle(element, key, value) {
	element.style[key] = value;
	return element;
}

export function setStyles(element, styles) {
	Object.keys(styles).forEach((key) => {
		setStyle(element, key, styles[key]);
	});
	return element;
}

export function getStyle(element, key, numberType = true) {
	const value = window.getComputedStyle(element, null).getPropertyValue(key);
	return numberType ? parseFloat(value) : value;
}

export function sublings(target) {
	return Array.from(target.parentElement.children).filter(
		(item) => item !== target
	);
}

export function inverseClass(target, className) {
	sublings(target).forEach((item) => removeClass(item, className));
	addClass(target, className);
}

export function isInViewport(el, offset = 0) {
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

export function includeFromEvent(event, target) {
	return event.composedPath && event.composedPath().indexOf(target) > -1;
}

export function replaceElement(newChild, oldChild) {
	oldChild.parentNode.replaceChild(newChild, oldChild);
	return newChild;
}

export function addClassToMany(target, className) {
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
export function addDefaultForDeep(object, property, id, defaultObj) {
	if (!object.hasOwnProperty(property)) {
		return;
	}
	Object.keys(object).some(function (key) {
		if (key === property && typeof object[key] === "object") {
			object[key].forEach((val) => {
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
import { watchEffect, isRef } from "vue";
export function renderComponent({
	el,
	component,
	props,
	appContext,
	condition = { value: true },
}) {
	let vNode;
	watchEffect(
		() => {
			if (component && condition?.value) {
				vNode = h(component, props);

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
export function logTest({ message }) {
	return message;
}

/**
 * 
 * Append component trong thẻ script
 * <script setup>
import { ref, onUnmounted, getCurrentInstance } from 'vue'
import renderComponent from './renderComponent'

const { appContext } = getCurrentInstance()
const container = ref()
let counter = 1
let destroyComp = null

onUnmounted(() => destroyComp?.())

const insert = async () => {
  destroyComp?.()
  destroyComp = renderComponent({
    el: document.createDocumentFragment(),
    component: (await import('@/components/HelloWorld.vue')).default
    props: {
      key: counter,
      msg: 'Message ' + counter++,
    },
    appContext,
  })
}
</script>

<template>
  <button @click="insert">Insert component</button>
  <div ref="container"></div>
</template>
 */
