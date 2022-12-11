<template>
	<div>
		<q-form
			autocorrect="on"
			autocapitalize="on"
			autocomplete="on"
			spellcheck="true"
			@submit="onSubmit"
			class="q-gutter-md"
		>
			<q-input
				v-model="username"
				autofocus
				filled
				dense
				hide-bottom-space
				color="positive"
				label="Username *"
				hint="Username or email address"
				lazy-rules
				:rules="[
					(val) => (val && val.length > 0) || 'Please type something',
				]"
			/>
			<q-input
				v-model="password"
				filled
				dense
				hide-bottom-space
				color="positive"
				:type="isPwd ? 'password' : 'text'"
				label="Password *"
				hint="Password"
				lazy-rules
				:rules="[
					(val) => (val && val.length > 0) || 'Please type something',
				]"
			>
				<template v-slot:append>
					<q-icon
						:name="isPwd ? 'visibility_off' : 'visibility'"
						class="cursor-pointer"
						@click="isPwd = !isPwd"
					/>
				</template>
			</q-input>

			<div class="q-mt-lg">
				<q-btn
					class="full-width"
					label="Send me code"
					type="submit"
					color="positive"
				/>
			</div>
		</q-form>
	</div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const isPwd = ref(true);

const onSubmit = () => {};
</script>

<style></style>
