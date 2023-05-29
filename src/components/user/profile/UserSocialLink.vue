<template>
	<q-list>
		<q-item
			v-for="link in links"
			:key="link.icon + 'link'"
			class="q-px-none"
		>
			<q-item-section avatar>
				<q-icon color="positive" size="2rem" :name="link.icon" />
			</q-item-section>
			<q-item-section>
				<q-input
					ref="profileInputSocial"
					color="positive"
					maxlength="100"
					clearable
					v-model="link.value"
					type="text"
					dense
					filled
					:placeholder="link.placeholder"
					@focus.once="link.value = link.placeholder"
				/>
			</q-item-section>
		</q-item>
	</q-list>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const placeholder = ref("");
defineProps({});
const links = ref([
	{
		icon: "mdi-facebook",
		value: ref(""),
		placeholder: "https://www.facebook.com/",
	},
	{
		icon: "mdi-youtube",
		value: ref(""),
		placeholder: "https://www.youtube.com/c/",
	},
	{
		icon: "mdi-instagram",
		value: ref(""),
		placeholder: "https://www.instagram.com/",
	},
	{
		icon: "mdi-twitter",
		value: ref(""),
		placeholder: "https://www.twitter.com/",
	},
	{
		icon: "mdi-discord",
		value: ref(""),
		placeholder: "https://www.discord.gg/",
	},
	{
		icon: "mdi-twitch",
		value: ref(""),
		placeholder: "https://www.twitch.tv/",
	},
]);

const profileInputSocial = ref(null);
defineExpose({
	links,
	profileInputSocial,
});
</script>

<style lang="scss"></style>
