import { defineStore } from "pinia";
import { useQuasar } from "quasar";

import { useOidcStore } from "stores/modules/oidc-store";
import { useAccountStore } from "stores/components/account-store";
import TopupDialog from "components/payments/TopupDialog.vue";
import PayoutDialog, {
	Props as PayoutDialogProp,
} from "components/payments/PayoutDialog.vue";

export const useTopupStore = defineStore("topup-store", () => {
	const $q = useQuasar();
	function openTopupDialog() {
		const { oidcIsAuthenticated } = useOidcStore();
		if (!oidcIsAuthenticated) {
			const { openLoginDialog } = useAccountStore();
			openLoginDialog();
			return;
		}
		return $q.dialog({
			component: TopupDialog,
		});
	}
	function openPayoutDialog(props?: PayoutDialogProp) {
		return $q.dialog({
			component: PayoutDialog,
			componentProps: props,
		});
	}

	return { openPayoutDialog, openTopupDialog };
});
