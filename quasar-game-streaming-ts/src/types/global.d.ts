import { ApiError, RemoteServiceErrorResponse } from "boot/openapi-client";
import { ChatInputSkeleton } from "components/chat";

declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		ChatInputSkeleton: typeof ChatInputSkeleton;
	}
}

declare class ApiErrorType extends ApiError {
	override body: RemoteServiceErrorResponse;
}

declare global {
	type ApiError = ApiErrorType;
}
