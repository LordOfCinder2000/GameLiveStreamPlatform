<template>
	<q-avatar>
		<q-img
			spinner-size="1rem"
			spinner-color="positive"
			initial-ratio="1"
			:src="src"
			placeholder-src="~assets/images/default-avatar.webp"
		>
			<template v-slot:error>
				<q-img
					style="padding: 0"
					loading="eager"
					src="~assets/images/default-avatar.webp"
				/>
			</template>
		</q-img>
	</q-avatar>
</template>

<script setup lang="ts">
const props = defineProps({
	src: String,
});
</script>

<style scoped></style>
