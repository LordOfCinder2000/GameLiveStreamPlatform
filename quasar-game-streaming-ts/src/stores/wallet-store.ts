import { defineStore } from "pinia";
import { apiClient, VirtualCurrencyDto, WalletDto } from "boot/openapi-client";

export const useWalletStore = defineStore("wallet-store", {
	state: () => ({
		wallet: <WalletDto>{},
	}),
	getters: {
		getCoin: (state) =>
			state.wallet.currencies?.find(
				(x) =>
					x.sku?.toLocaleLowerCase() ==
					process.env.COIN_SKU.toLocaleLowerCase()
			) ??
			<VirtualCurrencyDto>{
				imageUrl: process.env.COIN_DEFAULT_IMG,
				name: "Catoken",
				quantity: 0,
			},
		getMana: (state) =>
			state.wallet.currencies?.find(
				(x) =>
					x.sku?.toLocaleLowerCase() ==
					process.env.MANA_SKU.toLocaleLowerCase()
			) ??
			<VirtualCurrencyDto>{
				imageUrl: process.env.MANA_DEFAULT_IMG,
				name: "Mana",
				quantity: 0,
			},
		getWalletCurrencies(state) {
			return state.wallet.currencies ?? {};
		},
	},
	actions: {
		async getWallet(): Promise<WalletDto> {
			try {
				return (this.wallet = await apiClient.wallet.get());
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
	},
});
