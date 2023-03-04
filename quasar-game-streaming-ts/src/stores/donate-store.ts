import { defineStore } from "pinia";
import {
	apiClient,
	CreateDonateDto,
	DonateActionType,
	PagedResultDtoOfDonateDto,
} from "boot/openapi-client";

export const useDonateStore = defineStore("donate-store", {
	state: () => ({}),
	getters: {},
	actions: {
		async donate(requestBody: CreateDonateDto): Promise<void> {
			try {
				await apiClient.donate.create(requestBody);
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		async getListDonate(
			donateAction: DonateActionType,
			maxCreationTime?: string,
			minCreationTime?: string,
			sorting?: string,
			skipCount?: number,
			maxResultCount?: number
		): Promise<PagedResultDtoOfDonateDto> {
			try {
				return await apiClient.donate.getList(
					donateAction,
					true,
					maxCreationTime,
					minCreationTime,
					sorting,
					skipCount,
					maxResultCount
				);
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		async giveBackDonate(donateId: string): Promise<void> {
			try {
				await apiClient.donate.giveBack(donateId);
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
	},
});
