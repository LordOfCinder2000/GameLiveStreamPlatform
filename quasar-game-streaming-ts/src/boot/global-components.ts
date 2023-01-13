import { boot } from "quasar/wrappers";
import { ChatInputSkeleton } from "components/chat";
export default boot(({ app }) => {
	app.component("ChatInputSkeleton", ChatInputSkeleton);
});
