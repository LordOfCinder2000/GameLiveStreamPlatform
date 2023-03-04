import { boot } from "quasar/wrappers";
import { ChatInputSkeleton } from "components/chat";
import NoData from "components/NoData.vue";
import CustomTooltipSimple from "components/CustomTooltipSimple.vue";
import ProfileAvatar from "components/ProfileAvatar.vue";

export default boot(({ app }) => {
	app.component("ChatInputSkeleton", ChatInputSkeleton);
	app.component("NoData", NoData);
	app.component("MyTooltip", CustomTooltipSimple);
	app.component("ProfileAvatar", ProfileAvatar);
});
