import { boot } from "quasar/wrappers";
export { useSignalR } from "@quangdao/vue-signalr";
import {
	HubConnectionBuilder,
	IHttpConnectionOptions,
} from "@microsoft/signalr";
import {
	PagedResultDtoOfChannelDto,
	ChatMessageDto,
} from "boot/openapi-client";
import {
	SignalRConfig,
	HubCommandToken,
	HubEventToken,
	SignalRService,
	VueSignalR,
} from "@quangdao/vue-signalr";
import { useOidcStore } from "stores/modules/oidc-store";

const createSignalRService = (config: SignalRConfig) => {
	const signalRService = new SignalRService(
		config,
		new HubConnectionBuilder()
	);
	signalRService.init();
	return signalRService;
};

//======Define type strong
// export const SendMessageToAll: HubCommandToken<string> = "SendMessageToAll";
// export const NewMessage: HubEventToken<string> = "NewMessage";

//======Define composable

export function useChatHubSignalR() {
	//Define config
	const { oidcAccessToken } = useOidcStore();
	const configChatHub: SignalRConfig = {
		url: `${process.env.API_URL}/signalr-hubs/chat`,
		automaticReconnect: true,
		accessTokenFactory: () => oidcAccessToken,
		prebuild(_, options: IHttpConnectionOptions) {
			options.headers = {
				"X-ClientId": "client-signalr",
				// Authorization: "Bearer " + oidcAccessToken,
			};
		},
	};

	//Define type strong

	//Command
	const SendMessageToAll: HubCommandToken<string> = "SendMessageToAll";
	const SendMessageToChatRoom: HubCommandToken<ChatMessageDto> =
		"SendMessageToChatRoom";
	const JoinChatRoom: HubCommandToken<string> = "JoinChatRoom";
	const LeaveChatRoom: HubCommandToken<string> = "LeaveChatRoom";
	//Event
	const NewMessage: HubEventToken<string> = "NewMessage";
	const ReceiveChatMessage: HubEventToken<ChatMessageDto> =
		"ReceiveChatMessage";
	const GetChannelInChatRoom: HubEventToken<PagedResultDtoOfChannelDto> =
		"GetChannelInChatRoom";
	const OnNotFound: HubEventToken<string> = "OnNotFound";
	const OnError: HubEventToken<string> = "OnError";

	const chatHubSignalR = createSignalRService(configChatHub);
	return {
		chatHubSignalR,
		SendMessageToAll,
		NewMessage,
		ReceiveChatMessage,
		GetChannelInChatRoom,
		OnNotFound,
		OnError,
		SendMessageToChatRoom,
		JoinChatRoom,
		LeaveChatRoom,
	};
}

export function useNotificationHubSignalR() {
	//Define config
	const configNotificationHub: SignalRConfig = {
		url: `${process.env.API_URL}/signalr-hubs/notification`,
		automaticReconnect: true,
	};

	return createSignalRService(configNotificationHub);
}

//======Define global signalr
export default boot(({ app }) => {
	// app.use(VueSignalR, configChatHub);
});
