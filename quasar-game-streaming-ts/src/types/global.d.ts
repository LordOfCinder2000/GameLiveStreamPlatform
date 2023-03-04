import { ApiError, RemoteServiceErrorResponse } from "boot/openapi-client";
import { ChatInputSkeleton } from "components/chat";
import CustomTooltipSimple from "components/CustomTooltipSimple.vue";
import NoData from "components/NoData.vue";
import ProfileAvatar from "components/ProfileAvatar.vue";

declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		ChatInputSkeleton: typeof ChatInputSkeleton;
		NoData: typeof NoData;
		MyTooltip: typeof CustomTooltipSimple;
		ProfileAvatar: typeof ProfileAvatar;
	}
}

declare class ApiErrorType extends ApiError {
	override body: RemoteServiceErrorResponse;
}

declare global {
	type ApiError = ApiErrorType;
}
