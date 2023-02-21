<template>
	<div class="text-h6 q-mb-sm">Profile</div>
	<q-card flat square class="profile-wrapper bg-list-active">
		<q-card-section class="q-pa-sm">
			<q-list separator>
				<q-item>
					<q-item-section
						class="text-subtitle1 text-weight-medium label-avatar"
						avatar
					>
						Profile Picture
					</q-item-section>

					<q-item-section>
						<q-avatar
							class="cursor-pointer"
							size="4rem"
							color="positive"
							text-color="white"
							ref="avatar"
							@click="$refs.dialogAvatar.dialog.show = true"
						>
							<q-icon v-if="!hadAvatar" name="person" />
							<q-img
								:src="profile.avatar"
								@load="hadAvatar = true"
								@error="hadAvatar = false"
								v-show="hadAvatar"
							/>
						</q-avatar>
						<AvatarEditor ref="dialogAvatar" />
					</q-item-section>

					<q-item-section class="text-hover" side>
						<q-btn
							color="positive"
							dense
							flat
							no-caps
							label="Edit"
							@click="$refs.dialogAvatar.dialog.show = true"
						/>
						<q-btn
							v-if="hadAvatar"
							color="negative"
							dense
							flat
							no-caps
							label="Delete"
							@click="deleteAvatar"
						/>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section
						class="text-subtitle1 text-weight-medium label-avatar"
						avatar
					>
						ID
					</q-item-section>

					<q-item-section>
						<q-item-label lines="1">2018600274</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					v-for="profile in profiles.filter((item) => {
						return item.type === 'input';
					})"
					:key="profile.name"
				>
					<q-item-section
						class="text-subtitle1 text-weight-medium label-avatar"
						avatar
					>
						{{ profile.label }}
					</q-item-section>

					<q-item-section>
						<q-item-label lines="1">
							<UserForm
								v-if="editeds.includes(profile.name)"
								@close="
									editeds = editeds.filter(
										(item) => item !== profile.name
									)
								"
							>
								<component
									:ref="profile.name"
									:is="profile.component"
								></component>
							</UserForm>
							<q-item-label v-else lines="2">
								{{ profile.value }}
							</q-item-label>
						</q-item-label>
					</q-item-section>

					<q-item-section class="text-hover" side>
						<q-btn
							v-if="!editeds.includes(profile.name)"
							color="positive"
							dense
							flat
							no-caps
							label="Edit"
							@click="editeds.push(profile.name)"
						/>
					</q-item-section>
				</q-item>
				<q-item
					v-for="profile in profiles.filter((item) => {
						return item.type === 'dialog';
					})"
					:key="profile.name"
				>
					<q-item-section
						class="text-subtitle1 text-weight-medium label-avatar"
						avatar
					>
						{{ profile.label }}
					</q-item-section>

					<q-item-section>
						<component
							:ref="profile.name"
							:is="profile.component"
						></component>
						<q-item-label lines="2">
							{{ profile.value }}
						</q-item-label>
					</q-item-section>

					<q-item-section class="text-hover" side>
						<q-btn
							color="positive"
							dense
							flat
							no-caps
							label="Edit"
							@click="$refs[profile.name][0].dialog.show = true"
						/>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section
						class="text-subtitle1 text-weight-medium label-avatar"
						avatar
						top
					>
						<q-list>
							<q-item class="no-padding">
								<q-item-section> Social links</q-item-section>
							</q-item>
						</q-list>
					</q-item-section>

					<q-item-section>
						<q-item-label lines="1">
							<UserForm
								v-if="editeds.includes('link')"
								@close="
									editeds = editeds.filter(
										(item) => item !== 'link'
									)
								"
							>
								<UserSocialLink ref="socialLink" />
							</UserForm>
							<q-item-label v-else-if="validLinks.length > 0">
								<q-list>
									<q-item
										v-for="validLink in validLinks"
										:key="validLink.icon + 'link'"
										class="q-px-none"
									>
										<q-item-section avatar>
											<q-icon
												color="positive"
												size="2rem"
												:name="validLink.icon"
											/>
										</q-item-section>
										<q-item-section>
											<q-item-label
												class="text-weight-bold text-hover"
												lines="1"
											>
												{{ validLink.value }}
											</q-item-label>
										</q-item-section>
									</q-item>
								</q-list>
							</q-item-label>
							<div v-else class="">
								<q-item-label lines="1">
									Add social links that will display on your
									channel profile
								</q-item-label>
								<q-btn
									style="width: 8rem"
									class="q-mt-sm"
									unelevated
									color="positive"
									label="Add"
									@click="editeds.push('link')"
									no-caps
								/>
							</div>
						</q-item-label>
					</q-item-section>

					<q-item-section class="text-hover" side top>
						<q-list>
							<q-item class="no-padding">
								<q-item-section>
									<q-btn
										v-if="
											!editeds.includes('link') &&
											validLinks.length > 0
										"
										color="positive"
										dense
										flat
										no-caps
										label="Edit"
										@click="editeds.push('link')"
									/>
								</q-item-section>
							</q-item>
						</q-list>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
	</q-card>
</template>

<script lang="ts" setup>
import { ref, shallowRef, defineAsyncComponent } from "vue";

import UserName from "components/user/profile/UserName.vue";
import UserGender from "components/user/profile/UserGender.vue";
import UserSocialLink from "components/user/profile/UserSocialLink.vue";
const AvatarEditor = defineAsyncComponent(
	() => import("components/user/profile/AvatarEditor.vue")
);
const UserBirthDate = defineAsyncComponent(
	() => import("components/user/profile/UserBirthDate.vue")
);
const UserAbout = defineAsyncComponent(
	() => import("components/user/profile/UserAbout.vue")
);
const UserForm = defineAsyncComponent(
	() => import("components/user/profile/UserForm.vue")
);

const hadAvatar = ref(false);

const profile = ref({
	avatar: "https://astatic.trovocdn.net/cat/img/e8ec087.webp?max_age=31536000&imageView2/1/w/64/h/64",
});

const deleteAvatar = () => {
	profile.value.avatar = "";
	hadAvatar.value = false;
};

const profiles = shallowRef([
	{
		name: "username",
		label: "Username",
		value: "Gatayvaichuoi",
		component: UserName,
		type: "input",
	},
	{
		name: "phone",
		label: "Phone number",
		value: "232323232",
		component: UserName,
		type: "input",
	},
	{
		name: "gender",
		label: "Gender",
		value: "Male",
		component: UserGender,
		type: "input",
	},
	{
		name: "dialogBirthday",
		label: "Birthday",
		value: "17/11/2000",
		component: UserBirthDate,
		type: "dialog",
	},
	{
		name: "dialogAbout",
		label: "About",
		value: "About me",
		component: UserAbout,
		type: "dialog",
	},
]);

const editeds = ref<string[]>([]);

const validLinks = ref([
	{
		icon: "mdi-facebook",
		value: "https://www.facebook.com/",
	},
	{
		icon: "mdi-youtube",
		value: "https://www.youtube.com/c/",
	},
]);
</script>

<style lang="scss" scoped>
.profile-wrapper {
	.label-avatar {
		min-width: 10rem;
	}
}
</style>
