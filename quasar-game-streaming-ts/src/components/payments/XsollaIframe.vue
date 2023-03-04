<template>
	<div class="fit relative-position">
		<div
			v-if="showSkeleton"
			class="fit q-pa-lg absolute-full overflow-auto"
		>
			<div class="fit column q-gutter-y-md justify-between no-wrap">
				<q-skeleton type="rect" width="20%" />
				<div class="col-3">
					<div class="row q-col-gutter-lg fit">
						<div class="col-4" v-for="n in 3" :key="n">
							<q-skeleton class="fit" type="rect" />
						</div>
					</div>
				</div>
				<q-skeleton type="rect" width="30%" />
				<div class="col-grow">
					<div class="row q-col-gutter-lg fit">
						<div class="col-4" v-for="n in 3" :key="n">
							<q-skeleton class="fit" type="rect" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<iframe
			id="xsolla-iframe"
			class="fit no-margin no-border"
			:src="url"
			frameborder="0"
			allowpaymentrequest
			scrolling="no"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
	url: {
		type: String,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "completePayment"): void;
}>();

// const xsollaPaystationUrl = computed(
// 	() => process.env.XSOLLA_PAYSTATION_URL + props.accessToken
// );
const showSkeleton = ref(true);
const xsollaPaystationVersionHandler = (eventData: any) => {
	switch (eventData.data.version) {
		case "Pay Station 3":
			version3Handler(eventData);
			break;

		case "Pay Station 4":
			version4Handler(eventData);
			break;

		default:
			break;
	}
};
const version3Handler = (eventData: any) => {
	switch (eventData.action) {
		case "complete":
			emit("completePayment");
			break;

		default:
			break;
	}
};
const version4Handler = (eventData: any) => {
	switch (eventData.command) {
		case "open-status-success":
			emit("completePayment");
			break;

		default:
			break;
	}
};

onMounted(() => {
	window.addEventListener("message", (event) => {
		if (event.origin !== process.env.XSOLLA_URL) return;
		console.log(event);

		if (showSkeleton.value) showSkeleton.value = false;

		const data = JSON.parse(event.data);
		if (data) {
			xsollaPaystationVersionHandler(data);
		}
	});
});
</script>
