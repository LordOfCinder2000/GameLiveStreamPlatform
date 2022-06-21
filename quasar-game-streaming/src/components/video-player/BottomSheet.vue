<template>
	<q-popup-proxy
		v-if="treeData.children && treeData.children.length"
		v-model="model"
		:target="treeData.target"
		position="bottom"
		:breakpoint="$q.screen.width + 1 + 'px'"
	>
		<SwipeToClose v-model="model">
			<q-card class="dialog-bottom-sheet">
				<q-card-section class="text-h5 flex items-center">
					<q-btn
						v-if="treeData.iconBack"
						flat
						dense
						:icon="treeData.iconBack"
						class="on-left"
						v-close-popup
					/>
					{{ treeData.title }}
				</q-card-section>

				<q-list>
					<q-item
						v-for="(children, index) in treeData.children"
						:key="index"
						clickable
						@click="
							() => {
								selected = index;
								emit('selected', {
									option: treeData,
									selected: children,
								});
							}
						"
					>
						<bottom-sheet
							@selected="emit('selected', $event)"
							:treeData="children"
						></bottom-sheet>

						<q-item-section avatar>
							<q-icon
								v-if="
									(index == selected && !children.icon) ||
									children.default
								"
								color="positive"
								name="check"
							/>
							<q-icon
								v-else
								color="positive"
								:name="children.icon"
							/>
						</q-item-section>
						<q-item-section>{{ children.label }}</q-item-section>
					</q-item>
				</q-list>
			</q-card>
		</SwipeToClose>
	</q-popup-proxy>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useQuasar } from "quasar";
import SwipeToClose from "components/SwipeToClose.vue";
const $q = useQuasar();
const model = ref(false);
const selected = ref(null);

const props = defineProps({
	treeData: Object,
});

const emit = defineEmits(["selected"]);

onMounted(() => {});

watchEffect(() => {});
</script>

<style lang="scss" scoped>
.dialog-bottom-sheet {
	height: 50vh;

	padding-bottom: 0.5rem;
	&::after {
		border-radius: $generic-border-radius;
		top: 5px;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		position: absolute;
		content: "";
		height: 5px;
		width: 25%;
		background: $positive;
		opacity: 0.6;
		cursor: grab;
	}
}
</style>
