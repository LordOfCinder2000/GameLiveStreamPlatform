<template>
	<UserDialog ref="dialog" title="Edit birthday">
		<div class="flex flex-center q-py-sm" style="width: 30vw">
			<vue-avatar
				:width="180"
				:height="180"
				:rotation="rotation"
				:scale="scaleImg"
				:borderRadius="200"
				ref="avatarImg"
				@vue-avatar-editor:image-ready="onImageReady"
			>
			</vue-avatar>
		</div>
		<img ref="image" />
		<template v-slot:actions>
			<q-card-actions align="between" class="no-wrap row bg-list-active">
				<q-btn
					class="col-auto"
					padding="xs"
					dense
					flat
					color="positive"
					icon="rotate_right"
					@click="rotateImg"
				/>
				<q-space />
				<q-item dense class="col-grow no-padding">
					<q-item-section class="q-pr-xs" side style="color: unset">
						<q-icon name="zoom_out" />
					</q-item-section>
					<q-item-section>
						<q-slider
							color="positive"
							v-model="scaleImg"
							:min="1"
							:max="3"
							:step="0.02"
						/>
					</q-item-section>
					<q-item-section
						style="padding-left: 5px; color: unset"
						side
					>
						<q-icon name="zoom_in" />
					</q-item-section>
				</q-item>
			</q-card-actions>
			<q-separator />

			<q-card-actions align="between" class="no-wrap">
				<q-btn
					unelevated
					dense
					label="Upload"
					color="primary"
					no-caps
					@click="$refs.avatarImg.clicked()"
				/>
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
		</template>
	</UserDialog>
</template>

<script setup>
import { ref } from "vue";
import VueAvatar from "components/user/profile/AvatarCrop.vue";
import UserDialog from "./UserDialog.vue";
const props = defineProps({
	showDialog: {
		type: Boolean,
		default: false,
	},
});

// Phần chọn ảnh avatar
const scaleImg = ref(1);
const rotation = ref(0);
const rotateImg = () => {
	rotation.value += 90;
};
const avatarImg = ref(null);
const image = ref(null);
const saveImg = () => {
	var img = avatarImg.value.getImageScaled();
	image.value.src = img.toDataURL();
};
const onImageReady = () => {
	scaleImg.value = 1;
	rotation.value = 0;
};

const loading = ref(false);
const simulateProgress = () => {
	// we set loading state
	loading.value = true;

	// simulate a delay
	setTimeout(() => {
		// we're done, we reset loading state
		loading.value = false;
	}, 3000);
};

const dialog = ref(null);
defineExpose({ dialog });
</script>

<style lang="scss"></style>
