import { ref, watchEffect } from "vue";
import { useQuasar } from "quasar";

export function getColumnByScreen(screen) {
	const $q = useQuasar();
	const columns = ref(0);
	watchEffect(() => {
		try {
			if ($q.screen.xl) columns.value = screen.xl;
			if ($q.screen.md || $q.screen.gt.md) columns.value = screen.md;
			if ($q.screen.sm) columns.value = screen.sm;
			if ($q.screen.xs) columns.value = screen.xs;
		} catch (error) {
			columns.value = 0;
		}
	});

	return columns;
}
