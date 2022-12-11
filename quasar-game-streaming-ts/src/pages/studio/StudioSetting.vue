<template>
	<div class="text-h6 q-mb-sm text-no-wrap">Cài Đặt Phát Trực Tiếp</div>
	<q-card flat square class="setting-wrapper bg-list-active">
		<q-card-section class="q-pa-sm overflow-hidden">
			<q-list class="q-gutter-y-lg">
				<q-item class="row">
					<q-item-section avatar no-wrap>
						<q-item-label class="text-bold">
							Server URL
						</q-item-label>
					</q-item-section>
					<q-item-section>
						<q-input
							ref="rtmpUrlRef"
							v-model="rtmpUrl"
							readonly
							standout
							dense
							item-aligned
							input-class="text-positive text-bold"
						/>
					</q-item-section>
					<q-item-section side>
						<q-btn
							unelevated
							no-caps
							no-wrap
							color="positive"
							icon="content_copy"
							label="Sao chép"
							@click="copyText(rtmpUrl)"
						/>
					</q-item-section>
				</q-item>

				<q-item>
					<q-item-section avatar no-wrap>
						<q-item-label class="text-bold">
							Stream key
						</q-item-label>
					</q-item-section>
					<q-item-section>
						<q-input
							ref="streamKeyRef"
							v-model="streamKey"
							readonly
							standout
							dense
							item-aligned
							input-class="text-positive text-bold"
						/>
					</q-item-section>
					<q-item-section side>
						<div class="row q-gutter-x-md">
							<q-btn
								unelevated
								no-caps
								no-wrap
								color="positive"
								icon="content_copy"
								label="Sao chép"
								@click="copyText(streamKey)"
							/>
							<q-btn
								outline
								no-caps
								no-wrap
								color="positive"
								icon="refresh"
								label="Đặt lại"
							/>
						</div>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section avatar no-wrap>
						<q-item-label class="text-bold">
							Lưu lại các live stream
						</q-item-label>
					</q-item-section>
					<q-item-section>
						<q-toggle v-model="recordStream" color="positive" />
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { copyToClipboard, useQuasar } from "quasar";
const $q = useQuasar();
const rtmpUrl = ref("rtmp://entrypoint.evgcdn.net/live");
const rtmpUrlRef = ref(null);
const streamKey = ref("232322323");
const streamKeyRef = ref(null);

const recordStream = ref(true);
const copyText = async (text: string) => {
	await copyToClipboard(text)
		.then(() => {
			$q.notify({
				position: "top",
				color: "positive",
				message: "Đã sao chép thành công",
				icon: "done",
			});
		})
		.catch(() => {
			$q.notify({
				color: "negative",
				message: "Đã sao chép thất bại",
				icon: "error",
			});
		});
};
</script>

<style scoped lang="scss"></style>
