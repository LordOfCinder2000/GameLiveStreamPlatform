import { defineStore } from "pinia";
import {
	apiClient,
	CreatePaymentDto,
	CreateXsollaPayStationTokenDto,
	PagedResultDtoOfPaymentDto,
	PaymentDto,
	PaymentMethodDto,
	PaymentProviderTokenDto,
} from "boot/openapi-client";

export const usePaymentStore = defineStore("payment-store", {
	state: () => ({
		currentPayment: <PaymentDto>{},
		paymentMethods: <PaymentMethodDto[]>[],
		xsollaToken: <PaymentProviderTokenDto>{},
	}),
	getters: {
		getCurrentPaymentId(state) {
			return state.currentPayment.id;
		},
		getPaymentMethods(state) {
			return state.paymentMethods;
		},
		getXsollaAccessToken(state) {
			return state.xsollaToken.token;
		},
		getXsollaUrl(state) {
			return state.xsollaToken.checkoutUrl;
		},
	},
	actions: {
		async createXsollaAccessToken(
			paymentId: string,
			requestBody: CreateXsollaPayStationTokenDto
		): Promise<PaymentProviderTokenDto> {
			try {
				return (this.xsollaToken =
					await apiClient.payment.createXsollaPayStationToken(
						paymentId,
						requestBody
					));
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		async createPayment(
			requestBody: CreatePaymentDto
		): Promise<PaymentDto> {
			try {
				return (this.currentPayment = await apiClient.payment.create(
					requestBody
				));
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		async getListPaymentMethod(): Promise<PaymentMethodDto[]> {
			try {
				return (this.paymentMethods =
					await apiClient.payment.getListPaymentMethod());
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		async getListPayment(
			maxCreationTime?: string,
			minCreationTime?: string,
			sorting?: string,
			skipCount?: number,
			maxResultCount?: number
		): Promise<PagedResultDtoOfPaymentDto> {
			try {
				return await apiClient.payment.getList(
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
	},
});
