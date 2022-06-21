<template>
	<q-dialog v-model="show" persistent>
		<q-card>
			<q-card-section class="row items-center q-pa-sm relative-position">
				<div class="text-center text-h6 col">{{ title }}</div>
				<div class="absolute-right q-pa-xs">
					<q-btn
						icon="close"
						flat
						round
						dense
						v-close-popup
						@click="emit('close')"
					/>
				</div>
			</q-card-section>
			<q-separator />
			<q-card-section style="max-height: 50vh" class="no-padding">
				<slot name="default" />
			</q-card-section>

			<q-separator />
			<slot name="actions">
				<q-card-actions align="right" class="no-wrap">
					<div class="row q-gutter-x-sm no-wrap">
						<q-btn
							unelevated
							dense
							label="Cancel"
							color="primary"
							v-close-popup
							no-caps
							@click="emit('cancel')"
						/>
						<q-btn
							:loading="loading"
							unelevated
							dense
							label="Save"
							color="positive"
							no-caps
							@click="simulateProgress()"
							:class="{ 'cursor-not-allowed': loading }"
						/>
					</div>
				</q-card-actions>
			</slot>
		</q-card>
	</q-dialog>
</template>

<script setup>
import { ref, watchEffect, toRefs } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
const props = defineProps({
	title: String,
});

const emit = defineEmits(["save", "cancel", "close"]);

const loading = ref(false);
const simulateProgress = () => {
	// we set loading state
	loading.value = true;

	// simulate a delay
	setTimeout(() => {
		// we're done, we reset loading state
		loading.value = false;
		$q.notify({
			icon: "done",
			color: "positive",
			message: "Save successful!",
			timeout: 500,
		});
		show.value = false;
		emit("save");
		emit("close");
	}, 3000);
};
const show = ref(false);
watchEffect(() => {});
defineExpose({
	show,
});
</script>

<style></style>
