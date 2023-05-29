<template>
	<form
		@submit.prevent.stop="onSubmit"
		@reset.prevent.stop="onReset"
		class="q-gutter-md"
	>
		<q-btn icon="event" @click="dialog = true" round color="primary">
			<q-dialog v-model="dialog" persistent>
				<q-card>
					<q-card-section
						class="row items-center q-pa-sm relative-position"
					>
						<div class="text-center text-h6 col">
							Edit Profile Picture
						</div>
						<div class="absolute-right q-pa-xs">
							<q-btn
								icon="close"
								flat
								round
								dense
								v-close-popup
							/>
						</div>
					</q-card-section>

					<q-card-section class="no-padding">
						<q-date
							v-model="birthDay"
							color="positive "
							square
							flat
							style="width: 30vw"
						>
						</q-date>
					</q-card-section>
					<q-separator />
					<q-card-actions align="right" class="no-wrap">
						<div class="row q-gutter-x-sm no-wrap">
							<q-btn
								unelevated
								dense
								label="Cancel"
								color="primary"
								v-close-popup
								no-caps
							/>
							<q-btn
								:loading="loading"
								unelevated
								dense
								label="Save"
								color="positive"
								no-caps
								@click="
									saveImg();
									simulateProgress();
								"
								:class="{ 'cursor-not-allowed': loading }"
							/>
						</div>
					</q-card-actions>
				</q-card>
			</q-dialog>
		</q-btn>
		<div class="row q-gutter-x-md">
			<q-select
				class="col-2"
				color="positive"
				filled
				v-model="model"
				:options="options"
			/>
			<q-select
				class="col-2"
				color="positive"
				filled
				v-model="model"
				:options="options"
			/>
			<q-select
				class="col-2"
				color="positive"
				filled
				v-model="model"
				:options="options"
			/>
		</div>
		<div class="row no-wrap">
			<q-btn
				style="width: 4rem"
				:loading="loading"
				dense
				unelevated
				label="Save"
				type="submit"
				color="positive"
				no-caps
				@click="simulateProgress"
				:class="[{ 'cursor-not-allowed': loading }]"
			/>
			<q-btn
				style="width: 4rem"
				dense
				outline
				label="Cancel"
				type="reset"
				class="q-ml-sm"
				no-caps
			/>
		</div>
	</form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { date } from "quasar";
// destructuring to keep only what is needed
const { daysInMonth } = date;

const newDate = new Date();
const days = date.daysInMonth(newDate);
const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, "DD-MM-YYYY");
console.log(date);

const model = ref("Google");
const options = ref([]);

const dialog = ref(false);
const birthDay = ref("2019/02/01");
const onSubmit = () => {
	// inputRef.value.validate();
	// if (inputRef.value.hasError) {
	// 	// form has error
	// } else {
	// 	$q.notify({
	// 		icon: "done",
	// 		color: "positive",
	// 		message: "Save successful!",
	// 		timeout: 500,
	// 	});
	// }
};
const onReset = () => {
	model.value = null;
	// inputRef.value.resetValidation();
};

const loading = ref(false);
const simulateProgress = () => {
	// we set loading state
	loading.value = true;

	// simulate a delay
	setTimeout(() => {
		// we're done, we reset loading state
		loading.value = false;
	}, 1000);
};
</script>

<style lang="scss"></style>
