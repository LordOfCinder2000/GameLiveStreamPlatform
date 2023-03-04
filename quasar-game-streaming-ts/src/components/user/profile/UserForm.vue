<template>
	<form
		@submit.prevent.stop="onSubmit"
		@reset.prevent.stop="onReset"
		class="q-gutter-md"
	>
		<slot />
		<div class="row no-wrap">
			<q-btn
				style="min-width: 4rem"
				:loading="loading"
				dense
				unelevated
				label="Save"
				type="submit"
				color="positive"
				no-caps
				:class="[{ 'cursor-not-allowed': loading }]"
			/>
			<q-btn
				style="min-width: 4rem"
				dense
				outline
				label="Cancel"
				type="reset"
				class="q-ml-sm"
				no-caps
				@click="emit('close')"
			/>
		</div>
	</form>
</template>

<script setup>
import { ref, useSlots, onMounted } from "vue";
import { useQuasar } from "quasar";
const emit = defineEmits(["close", "cancel", "save"]);
const $q = useQuasar();
const slots = useSlots();
const form = ref(null);

let refValue;
onMounted(() => {
	let refName = slots.default()[0].props.ref;

	if (slots.default()[0].ref.i.ctx.$refs[refName].length) {
		refValue = slots.default()[0].ref.i.ctx.$refs[refName][0];
	} else {
		refValue = slots.default()[0].ref.i.ctx.$refs[refName];
	}
});

const onSubmit = () => {
	console.log(refValue);
	if (refValue && refValue.profileInput) {
		refValue.profileInput.validate();
		if (refValue.profileInput.hasError) {
			// form has error
		} else {
			simulateProgress();
		}
	} else {
		simulateProgress();
	}
};

const onReset = () => {
	if (refValue && refValue.profileInput && refValue.model) {
		refValue.model = null;
		refValue.profileInput.resetValidation();
	}
	if (refValue.gender) {
		refValue.gender = "";
	}
	if (refValue.links) {
		refValue.links.forEach((link) => {
			link.value = "";
		});
	}
};

const loading = ref(false);
const simulateProgress = () => {
	// we set loading state
	loading.value = true;

	// simulate a delay
	setTimeout(() => {
		// we're done, we reset loading state

		loading.value = false;
		$q.notify({
			type: "positive",
			message: "Save successful!",
			timeout: 500,
		});
		emit("close");
	}, 1000);
};
</script>

<style></style>
