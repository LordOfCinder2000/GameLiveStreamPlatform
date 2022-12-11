import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth-store", {
	state: () => ({
		isSignedIn: false,
	}),

	getters: {
		// doubleCount(state) {
		// 	return state.counter * 2;
		// },
	},

	actions: {
		// increment() {
		// 	this.counter++;
		// },
	},
});
