import { onDeactivated, onBeforeUnmount, getCurrentInstance } from "vue";
import { vmIsDestroyed } from "./utils";

/*
 * Usage:
 *    registerTimeout(fn[, delay])
 *    removeTimeout()
 */

export default function () {
	let timer: any;
	const vm = getCurrentInstance();

	function removeTimeout() {
		clearTimeout(timer);
	}

	onDeactivated(removeTimeout);
	onBeforeUnmount(removeTimeout);
	return {
		removeTimeout,

		registerTimeout(fn: () => void, delay: number) {
			clearTimeout(timer);

			if (vm && vmIsDestroyed(vm) === false) {
				timer = setTimeout(fn, delay);
			}
		},
	};
}
