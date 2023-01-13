<template>
	<div class="q-pa-md row justify-center">
		<div style="width: 100%">
			<q-chat-message label="Sunday, 19th" />

			<q-chat-message
				name="me"
				avatar="https://cdn.quasar.dev/img/avatar4.jpg"
				:text="['hey, how are you?']"
				stamp="7 minutes ago"
				size="grow"
			/>
			<q-chat-message
				name="Jane"
				avatar="https://cdn.quasar.dev/img/avatar3.jpg"
				:text="['doing fine, how r you?']"
				stamp="4 minutes ago"
				size="grow"
			/>
		</div>
		<AccountEmailConfirm />
	</div>
</template>

<script setup lang="ts">
import AccountEmailConfirm from "components/account/AccountEmailConfirm.vue";
window.addEventListener("unload ", function (event) {
	event.preventDefault();
	// event.returnValue = false;
});
</script>

<style scoped></style>
