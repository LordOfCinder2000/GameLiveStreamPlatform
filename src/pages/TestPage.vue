<template>
	<q-page padding>
		<q-form @submit="onSubmit" class="q-gutter-md">
			<q-input v-model="text" type="text" label="Label" />
			<div>
				<q-btn label="Submit" type="submit" color="primary" />
			</div>
		</q-form>
	</q-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
	apiClient,
	apiClientRequireAuth,
	testApiClientRequireAuth,
} from "boot/openapi-client";
const text = ref("sfsdfdfsdf");

const onSubmit = async () => {
	try {
		await apiClientRequireAuth.chat.sendMessage();
	} catch (error) {}
};
</script>

<style lang="scss" scoped></style>
