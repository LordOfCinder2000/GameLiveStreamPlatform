import { defineStore } from "pinia";
import {
	apiClient,
	GiftGroupDto,
	ItemSellableDto,
	PagedResultDtoOfGiftGroupDto,
	PagedResultDtoOfItemSellableDto,
	VirtualPrice,
} from "boot/openapi-client";

export const useItemStore = defineStore("item-store", {
	state: () => ({
		giftGroups: <GiftGroupDto>{},
	}),
	getters: {},
	actions: {
		getCoinImgUrlOrDefault(item?: ItemSellableDto | VirtualPrice) {
			return !item || !item.imageUrl
				? process.env.COIN_DEFAULT_IMG
				: item.imageUrl;
		},

		async getListGiftGroup(): Promise<PagedResultDtoOfGiftGroupDto> {
			try {
				return (this.giftGroups =
					await apiClient.item.getListGiftGroups());
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		async getListGiftByGroupId(
			giftGroupId: string,
			skipCount?: number,
			maxResultCount?: number,
			sorting?: string,
			locale?: string,
			country?: string
		): Promise<PagedResultDtoOfItemSellableDto> {
			try {
				return await apiClient.item.getListGiftByGroupId(
					giftGroupId,
					locale,
					country,
					sorting,
					skipCount,
					maxResultCount
				);
			} catch (error) {
				console.log(error);
				throw error;
			}
		},

		async getListVirtualCurrencyPackage(
			sorting?: string,
			skipCount?: number,
			maxResultCount?: number,
			locale?: string,
			country?: string
		): Promise<PagedResultDtoOfItemSellableDto> {
			try {
				return await apiClient.item.getListVirtualCurrencyPackage(
					locale,
					country,
					sorting,
					skipCount,
					maxResultCount
				);
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
	},
});
