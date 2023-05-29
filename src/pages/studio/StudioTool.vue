<template>
	<div class="text-h6 q-mb-sm text-no-wrap">Công Cụ Phát Sóng</div>
	<q-card flat square class="tool-wrapper bg-list-active overflow-hidden">
		<q-card-section class="q-pa-sm q-col-gutter-md row">
			<div
				v-for="(n, index) in 6"
				:key="index"
				class="col-3 col-xs-12 col-sm-6 col-md-3"
			>
				<q-card>
					<q-img
						fit="fill"
						src="https://gglive.vn/images/obs-image.svg"
					/>
					<q-card-section>
						<div class="text-bold text-center">
							Open Broadcaster Software
						</div>
						<div class="text-subtitle2 text-center">
							<a
								class="text-positive"
								href="https://223092959.e.cdneverest.net/boxstudio/docs/huong-dan-livestream-tren-gglive.pdf"
								target="_blank"
							>
								Hướng dẫn cài đặt
							</a>
						</div>
					</q-card-section>
					<q-card-actions vertical>
						<q-btn
							no-caps
							no-wrap
							unelevated
							color="positive"
							label="Tải về"
							href="https://obsproject.com/"
							target="_blank"
						/>
					</q-card-actions>
				</q-card>
			</div>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
