import { useOidcStore } from "stores/modules/oidc-store";
import { Notify } from "quasar";
export default function useAuthComp() {
	const { authenticateOidcPassword } = useOidcStore();
	const authenticateOidcPasswordComp = async (
		username: string,
		password: string
	) => {
		// await authenticateOidcPassword({
		// 	username: username,
		// 	password: password,
		// })
		// 	.then((succ) => {
		// 		Notify({
		// 			color: "positive",
		// 			message:
		// 				"Login successful, Hello " + succ.profile.unique_name,
		// 		});
		// 		//@ts-ignore
		// 		window.location.reload(true);
		// 		const loginChannel = new BroadcastChannel("login");
		// 		loginChannel.postMessage("reload");
		// 	})
		// 	.catch((err) => {
		// 		usernameError.value = err.message;
		// 		passwordError.value = err.message;
		// 		isValid.value = false;
		// 		// nameRef.value.validate();
		// 		// ageRef.value.validate();
		// 		Notify({
		// 			color: "negative",
		// 			message: "Authentication mismatch.",
		// 		});
		// 	});
	};

	return {
		authenticateOidcPasswordComp,
	};
}
