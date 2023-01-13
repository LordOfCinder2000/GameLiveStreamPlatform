import { watch, nextTick, onMounted, getCurrentInstance, Ref } from "vue";

import { vmHasRouter } from "./utils";

export const useModelToggleProps = {
	modelValue: {
		type: Boolean,
		default: null,
	},

	"onUpdate:modelValue": [Function, Array],
	disable: {
		type: Boolean,
		default: false,
	},
};

export const useModelToggleEmits = ["beforeShow", "show", "beforeHide", "hide"];

// handleShow/handleHide -> removeTick(), self (& emit show)

interface ModelToggleArgs {
	showing: Ref<boolean>;
	canShow?: (evt: any) => void | boolean; // optional
	hideOnRouteChange?: Ref<boolean>; // optional
	handleShow?: (evt: any) => void; // optional
	handleHide?: (evt: any) => void; // optional
	processOnMount?: boolean; // optional
}

export default function ({
	showing,
	canShow, // optional
	hideOnRouteChange, // optional
	handleShow, // optional
	handleHide, // optional
	processOnMount = true, // optional
}: ModelToggleArgs) {
	const vm = getCurrentInstance();

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { props, emit, proxy } = vm!;

	let payload: any;

	function toggle(evt: any) {
		if (showing.value === true) {
			hide(evt);
		} else {
			show(evt);
		}
	}

	function show(evt: { qAnchorHandled: boolean } | undefined) {
		if (
			props.disable === true ||
			(evt !== void 0 && evt.qAnchorHandled === true) ||
			(canShow !== void 0 && canShow(evt) !== true)
		) {
			return;
		}

		const listener = props["onUpdate:modelValue"] !== void 0;

		if (listener === true && __QUASAR_SSR_SERVER__ !== true) {
			emit("update:modelValue", true);
			payload = evt;
			nextTick(() => {
				if (payload === evt) {
					payload;
				}
			});
		}

		if (
			props.modelValue === null ||
			listener === false ||
			__QUASAR_SSR_SERVER__
		) {
			processShow(evt);
		}
	}

	function processShow(evt: any) {
		if (showing.value === true) {
			return;
		}

		showing.value = true;

		emit("beforeShow", evt);

		if (handleShow !== void 0) {
			handleShow(evt);
		} else {
			emit("show", evt);
		}
	}

	function hide(evt?: any) {
		if (__QUASAR_SSR_SERVER__ || props.disable === true) {
			return;
		}

		const listener = props["onUpdate:modelValue"] !== void 0;

		if (listener === true && __QUASAR_SSR_SERVER__ !== true) {
			emit("update:modelValue", false);
			payload = evt;
			nextTick(() => {
				if (payload === evt) {
					payload;
				}
			});
		}

		if (
			props.modelValue === null ||
			listener === false ||
			__QUASAR_SSR_SERVER__
		) {
			processHide(evt);
		}
	}

	function processHide(evt: any) {
		if (showing.value === false) {
			return;
		}

		showing.value = false;

		emit("beforeHide", evt);

		if (handleHide !== void 0) {
			handleHide(evt);
		} else {
			emit("hide", evt);
		}
	}

	function processModelChange(val: unknown) {
		if (props.disable === true && val === true) {
			if (props["onUpdate:modelValue"] !== void 0) {
				emit("update:modelValue", false);
			}
		} else if ((val === true) !== showing.value) {
			const fn = val === true ? processShow : processHide;
			fn(payload);
		}
	}

	watch(() => props.modelValue, processModelChange);

	if (hideOnRouteChange !== void 0 && vm && vmHasRouter(vm) === true) {
		if (proxy) {
			watch(
				() => proxy.$route.fullPath,
				() => {
					if (
						hideOnRouteChange.value === true &&
						showing.value === true
					) {
						hide();
					}
				}
			);
		}
	}

	processOnMount === true &&
		onMounted(() => {
			processModelChange(props.modelValue);
		});

	// expose public methods
	const publicMethods = { show, hide, toggle };
	if (proxy) {
		Object.assign(proxy, publicMethods);
	}

	return publicMethods;
}
