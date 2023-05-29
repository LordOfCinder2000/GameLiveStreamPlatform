import { EventBus } from "quasar";
import { boot } from "quasar/wrappers";
import type { InjectionKey } from "vue";
const bus = Symbol() as InjectionKey<EventBus>;
export default boot(({ app }) => {
	const eventBus = new EventBus();
	// for Options API
	app.config.globalProperties.$bus = eventBus;

	// for Composition API
	app.provide(bus, eventBus);
});
