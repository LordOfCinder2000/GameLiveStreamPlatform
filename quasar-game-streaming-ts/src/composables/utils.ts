import { Component, ComponentInternalInstance } from "vue";

export function vmHasRouter(vm: ComponentInternalInstance) {
	return vm.appContext.config.globalProperties.$router !== void 0;
}

export function vmIsDestroyed(vm: ComponentInternalInstance) {
	return vm.isUnmounted === true || vm.isDeactivated === true;
}
