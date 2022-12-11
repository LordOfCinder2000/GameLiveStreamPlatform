import { User } from "oidc-client-ts";

import {
	AuthenticateOidcSilentPayload,
	PiniaOidcClientSettings,
	PiniaOidcStoreListeners,
	PiniaOidcStoreSettings,
} from "../types/oidc";
import { PiniaState, PiniaStore } from "../types/store";
import { dispatchCustomBrowserEvent } from "../services/browser-event";
import {
	addUserManagerEventListener,
	createOidcUserManager,
	createOidcCustomUserManager,
	createOidcClient,
	getOidcCallbackPath,
	getOidcConfig,
	removeUserManagerEventListener,
	tokenExp,
	tokenIsExpired,
	JsonService,
} from "../services/oidc-helpers";
import { objectAssign, decode, readParams } from "../services/utils";
import { openUrlWithIframe } from "../services/navigation";

const state = {
	access_token: null,
	id_token: null,
	refresh_token: null,
	user: null,
	scopes: null,
	is_checked: false,
	events_are_bound: false,
	error: null,
};

const createStoreModule = <T>(
	oidcSettings: PiniaOidcClientSettings,
	storeSettings: PiniaOidcStoreSettings = {},
	oidcEventListeners: PiniaOidcStoreListeners = {}
) => {
	const oidcConfig = getOidcConfig(oidcSettings);

	const oidcUserManager = createOidcUserManager(oidcSettings);

	const oidcCustomUserManager = createOidcCustomUserManager(oidcSettings);

	const oidcClient = createOidcClient(oidcSettings);

	storeSettings = objectAssign<PiniaOidcStoreSettings>([
		{
			isAuthenticatedBy: "id_token",
		},
		storeSettings,
	]);

	const oidcCallbackPath = getOidcCallbackPath(
		oidcConfig.redirect_uri,
		storeSettings.routeBase || "/"
	);

	const oidcPopupCallbackPath = getOidcCallbackPath(
		oidcConfig.popup_redirect_uri,
		storeSettings.routeBase || "/"
	);

	const oidcSilentCallbackPath = getOidcCallbackPath(
		oidcConfig.silent_redirect_uri,
		storeSettings.routeBase || "/"
	);

	Object.keys(oidcEventListeners).forEach((eventName) => {
		addUserManagerEventListener(
			oidcUserManager,
			eventName,
			oidcEventListeners[eventName as keyof PiniaOidcStoreListeners]
		);
	});

	if (storeSettings.dispatchEventsOnWindow) {
		// Dispatch oidc-client events on window (if in browser)
		const userManagerEvents = [
			"userLoaded",
			"userUnloaded",
			"accessTokenExpiring",
			"accessTokenExpired",
			"silentRenewError",
			"userSignedOut",
		];
		userManagerEvents.forEach((eventName) => {
			addUserManagerEventListener(
				oidcUserManager,
				eventName,
				(detail: any) => {
					dispatchCustomBrowserEvent(eventName, detail || {});
				}
			);
		});
	}

	function isAuthenticated(store: any) {
		if (
			storeSettings?.isAuthenticatedBy &&
			store?.[storeSettings.isAuthenticatedBy]
		) {
			return true;
		}

		return false;
	}

	const routeIsPublic = (route: any) => {
		if (route.meta && route.meta.isPublic) {
			return true;
		}
		if (
			route.meta &&
			Array.isArray(route.meta) &&
			route.meta.reduce(
				(isPublic: any, meta: any) => meta.isPublic || isPublic,
				false
			)
		) {
			return true;
		}
		if (
			storeSettings.publicRoutePaths &&
			storeSettings.publicRoutePaths
				.map((path) => path.replace(/\/$/, ""))
				.indexOf(route.path.replace(/\/$/, "")) > -1
		) {
			return true;
		}
		if (
			storeSettings.isPublicRoute &&
			typeof storeSettings.isPublicRoute === "function"
		) {
			return storeSettings.isPublicRoute(route);
		}
		return false;
	};

	const routeIsOidcCallback = (route: any) => {
		if (route.meta && route.meta.isOidcCallback) {
			return true;
		}
		if (
			route.meta &&
			Array.isArray(route.meta) &&
			route.meta.reduce(
				(isOidcCallback: any, meta: any) =>
					meta.isOidcCallback || isOidcCallback,
				false
			)
		) {
			return true;
		}
		if (route.path && route.path.replace(/\/$/, "") === oidcCallbackPath) {
			return true;
		}
		if (
			route.path &&
			route.path.replace(/\/$/, "") === oidcPopupCallbackPath
		) {
			return true;
		}
		if (
			route.path &&
			route.path.replace(/\/$/, "") === oidcSilentCallbackPath
		) {
			return true;
		}
		return false;
	};

	const errorPayload = (
		context: any,
		error: any
	): PiniaOidcStoreListeners => {
		return {
			context,
			error: error && error.message ? error.message : error,
		};
	};

	const authenticateOidcSilent = (
		payload: AuthenticateOidcSilentPayload = {}
	) => {
		// Take options for signinSilent from 1) payload or 2) storeSettings if defined there

		const options =
			payload.options || storeSettings.defaultSigninSilentOptions || {};
		return new Promise((resolve, reject) => {
			oidcUserManager
				.signinSilent(options)
				.then((user) => {
					actions["oidcWasAuthenticated"](user);
					resolve(user);
				})
				.catch((err) => {
					actions["setOidcAuthIsChecked"];
					if (payload.ignoreErrors) {
						resolve(null);
					} else {
						actions["setOidcError"](
							errorPayload("authenticateOidcSilent", err)
						);
						reject(err);
					}
				});
		});
	};

	const dispatchCustomErrorEvent = (
		eventName: string,
		payload: PiniaOidcStoreListeners
	) => {
		// oidcError and automaticSilentRenewError are not UserManagement events, they are events implemeted in pinia-oidc,
		if (
			typeof oidcEventListeners[
				eventName as keyof PiniaOidcStoreListeners
			] === "function"
		) {
			oidcEventListeners[eventName as keyof PiniaOidcStoreListeners](
				payload
			);
		}
		if (storeSettings.dispatchEventsOnWindow) {
			dispatchCustomBrowserEvent(eventName, payload);
		}
	};

	const store = <G, A>(
		id: string,
		state: PiniaState<T>,
		getters?: G,
		actions?: A
	): PiniaStore<PiniaState<T>, G, A> => ({
		id,
		state: () => state,
		getters,
		actions,
	});

	const getters = {
		oidcIsAuthenticated() {
			return isAuthenticated(this);
		},
		oidcUser() {
			return this.user;
		},
		oidcAccessToken() {
			return tokenIsExpired(this.access_token) ? null : this.access_token;
		},
		oidcAccessTokenExp() {
			return tokenExp(this.access_token);
		},
		oidcScopes() {
			return this.scopes;
		},
		oidcIdToken() {
			return tokenIsExpired(this.id_token) ? null : this.id_token;
		},
		oidcIdTokenExp() {
			return tokenExp(this.id_token);
		},
		oidcRefreshToken() {
			return tokenIsExpired(this.refresh_token)
				? null
				: this.refresh_token;
		},
		oidcRefreshTokenExp() {
			return tokenExp(this.refresh_token);
		},
		oidcAuthenticationIsChecked() {
			return this.is_checked;
		},
		oidcError() {
			return this.error;
		},
		oidcIsRoutePublic() {
			return (route: any) => {
				return routeIsPublic(route);
			};
		},
	};

	const actions = {
		oidcCheckAccess(route: any) {
			return new Promise((resolve) => {
				if (routeIsOidcCallback(route)) {
					resolve(true);
					return;
				}
				let hasAccess = true;
				const getUserPromise: Promise<User | null> = new Promise(
					(resolve) => {
						oidcUserManager
							.getUser()
							.then((user) => {
								resolve(user);
							})
							.catch(() => {
								resolve(null);
							});
					}
				);
				const isAuthenticatedInStore = isAuthenticated(this);
				getUserPromise.then((user) => {
					if (!user || user.expired) {
						const authenticateSilently =
							oidcConfig.silent_redirect_uri &&
							oidcConfig.automaticSilentSignin;
						if (routeIsPublic(route)) {
							if (isAuthenticatedInStore) {
								this["unsetOidcAuth"]();
							}
							if (authenticateSilently) {
								authenticateOidcSilent({
									ignoreErrors: true,
								}).catch(() => {});
							}
						} else {
							const authenticate = () => {
								if (isAuthenticatedInStore) {
									this["unsetOidcAuth"]();
								}
								// this["authenticateOidc"]({
								// 	redirectPath: route.fullPath,
								// });
							};
							// If silent signin is set up, try to authenticate silently before denying access
							if (authenticateSilently) {
								authenticateOidcSilent({ ignoreErrors: true })
									.then(() => {
										oidcUserManager
											.getUser()
											.then((user) => {
												if (!user || user.expired) {
													authenticate();
												}
												resolve(!!user);
											})
											.catch(() => {
												authenticate();
												resolve(false);
											});
									})
									.catch(() => {
										authenticate();
										resolve(false);
									});
								return;
							}
							// If no silent signin is set up, perform explicit authentication and deny access
							authenticate();
							hasAccess = false;
						}
					} else {
						this["oidcWasAuthenticated"](user);
						if (!isAuthenticatedInStore) {
							if (
								oidcEventListeners &&
								typeof oidcEventListeners.userLoaded ===
									"function"
							) {
								oidcEventListeners.userLoaded(user);
							}
							if (storeSettings.dispatchEventsOnWindow) {
								dispatchCustomBrowserEvent("userLoaded", user);
							}
						}
					}
					resolve(hasAccess);
				});
			});
		},
		authenticateOidc(payload: AuthenticateOidcSilentPayload | string = {}) {
			if (typeof payload === "string") {
				payload = { redirectPath: payload };
			}
			if (payload.redirectPath) {
				sessionStorage.setItem(
					"pinia_oidc_active_route",
					payload.redirectPath
				);
			} else {
				sessionStorage.removeItem("pinia_oidc_active_route");
			}
			// Take options for signinRedirect from 1) payload or 2) storeSettings if defined there
			const options =
				payload.options ||
				storeSettings.defaultSigninRedirectOptions ||
				{};
			return oidcUserManager.signinRedirect(options).catch((err) => {
				this["setOidcError"](errorPayload("authenticateOidc", err));
			});
		},
		oidcSignInCallback(url?: string): Promise<string> {
			return new Promise((resolve, reject) => {
				oidcUserManager
					.signinRedirectCallback(url)
					.then((user) => {
						this["oidcWasAuthenticated"](user);
						resolve(
							sessionStorage.getItem("pinia_oidc_active_route") ||
								"/"
						);
					})
					.catch((err) => {
						this["setOidcError"](
							errorPayload("oidcSignInCallback", err)
						);
						this["setOidcAuthIsChecked"]();
						reject(err);
					});
			});
		},
		authenticateOidcSilent(payload: AuthenticateOidcSilentPayload = {}) {
			return authenticateOidcSilent.call(actions, payload);
		},
		authenticateOidcPopup(payload: AuthenticateOidcSilentPayload = {}) {
			// Take options for signinPopup from 1) payload or 2) storeSettings if defined there
			const options =
				payload.options ||
				storeSettings.defaultSigninPopupOptions ||
				{};
			// debugger;
			return new Promise((resolve, reject) => {
				oidcUserManager
					.signinPopup(options)
					.then((user) => {
						this["oidcWasAuthenticated"](user);
						resolve(user);
						//@ts-ignore
						// window.location.reload(true);
						// const loginChannel = new BroadcastChannel("login");
						// loginChannel.postMessage("reload");
					})
					.catch((err) => {
						this["setOidcError"](
							errorPayload("authenticateOidcPopup", err)
						);
						reject(err);
					});
			});
		},
		oidcSignInPopupCallback(url?: string): Promise<void> {
			return new Promise((resolve, reject) => {
				oidcUserManager.signinPopupCallback(url).catch((err) => {
					this["setOidcError"](
						errorPayload("authenticateOidcPopup", err)
					);
					this["setOidcAuthIsChecked"]();
					reject(err);
				});
			});
		},
		oidcWasAuthenticated(user: User | null) {
			if (user) {
				this["setOidcAuth"](user);
			}

			if (!state.events_are_bound) {
				oidcUserManager.events.addAccessTokenExpired(() => {
					this["unsetOidcAuth"]();
				});

				if (oidcSettings.automaticSilentRenew) {
					oidcUserManager.events.addAccessTokenExpiring(() => {
						authenticateOidcSilent().catch((err) => {
							dispatchCustomErrorEvent(
								"automaticSilentRenewError",
								errorPayload("authenticateOidcSilent", err)
							);
						});
					});
				}
				this["setOidcEventsAreBound"]();
			}
			this["setOidcAuthIsChecked"]();
		},
		storeOidcUser(user: User) {
			return oidcUserManager
				.storeUser(user)
				.then(() => oidcUserManager.getUser())
				.then((user) => this["oidcWasAuthenticated"](user))
				.then(() => {})
				.catch((err) => {
					this["setOidcError"](errorPayload("storeOidcUser", err));
					this["setOidcAuthIsChecked"]();
					throw err;
				});
		},
		getOidcUser() {
			/* istanbul ignore next */
			return oidcUserManager.getUser().then((user) => {
				this["setOidcUser"](user);
				return user;
			});
		},
		addOidcEventListener(payload: {
			eventName: string;
			eventListener: PiniaOidcStoreListeners;
		}) {
			/* istanbul ignore next */
			addUserManagerEventListener(
				oidcUserManager,
				payload.eventName,
				payload.eventListener
			);
		},
		removeOidcEventListener(payload: {
			eventName: string;
			eventListener: PiniaOidcStoreListeners;
		}) {
			/* istanbul ignore next */
			removeUserManagerEventListener(
				oidcUserManager,
				payload.eventName,
				payload.eventListener
			);
		},
		signOutOidc(payload = {}) {
			/* istanbul ignore next */
			return oidcUserManager.signoutRedirect(payload).then(() => {
				this["unsetOidcAuth"]();
			});
		},
		signOutOidcCallback() {
			/* istanbul ignore next */
			return oidcUserManager.signoutRedirectCallback();
		},
		signOutPopupOidc(payload: any) {
			/* istanbul ignore next */
			return oidcUserManager.signoutPopup(payload).then(() => {
				this["unsetOidcAuth"]();
			});
		},
		signOutPopupOidcCallback() {
			/* istanbul ignore next */
			return oidcUserManager.signoutPopupCallback();
		},
		signOutOidcSilent(payload?: any) {
			/* istanbul ignore next */
			return new Promise((resolve, reject) => {
				try {
					oidcUserManager
						.getUser()
						.then((user) => {
							if (user) {
								const args = objectAssign([
									payload || {},
									{
										id_token_hint: user
											? user.id_token
											: null,
									},
								]);
								if (payload && payload.id_token_hint) {
									args.id_token_hint = payload.id_token_hint;
								}
								oidcClient
									.createSignoutRequest(args)
									.then((signoutRequest) => {
										openUrlWithIframe(signoutRequest.url)
											.then(() => {
												this["removeOidcUser"]();

												//@ts-ignore
												window.location.reload(true);
												const logoutChannel =
													new BroadcastChannel(
														"logout"
													);
												logoutChannel.postMessage(
													"reload"
												);

												resolve(true);
											})
											.catch((err) => reject(err));
									})
									.catch((err) => reject(err));
							}
						})
						.catch((err) => reject(err));
				} catch (err) {
					reject(err);
				}
			});
		},
		removeUser() {
			/* istanbul ignore next */
			return this["removeOidcUser"]();
		},
		removeOidcUser() {
			/* istanbul ignore next */
			return oidcUserManager.removeUser().then(() => {
				this["unsetOidcAuth"]();
			});
		},
		clearStaleState() {
			return oidcUserManager.clearStaleState();
		},
		setOidcAuth(user: User) {
			this.id_token = user.id_token;
			this.access_token = user.access_token;
			this.refresh_token = user.refresh_token;
			this.user = user.profile;
			this.scopes = user.scopes;
			this.error = null;
		},
		setOidcUser(user: User) {
			this.user = user ? user.profile : null;
		},
		unsetOidcAuth() {
			this.id_token = null;
			this.access_token = null;
			this.refresh_token = null;
			this.user = null;
		},
		setOidcAuthIsChecked() {
			this.is_checked = true;
		},
		setOidcEventsAreBound() {
			this.events_are_bound = true;
		},
		setOidcError(payload: any) {
			this.error = payload.error;
			dispatchCustomErrorEvent("oidcError", payload);
		},
		signOutOidcAndPopupCallback(
			url: string = window.location.href,
			keepOpen: boolean = false
		): Promise<void> {
			return oidcUserManager.signoutCallback(url, keepOpen);
		},

		oidcSignInSilentCallback(
			url: string = window.location.href
		): Promise<void> {
			return oidcUserManager.signinSilentCallback(url);
		},

		authenticateOidcPassword(payload: any) {
			const options = payload
				? payload
				: {} ||
				  this.oidcStoreSettings?.defaultSigninPasswordOptions ||
				  {};
			return new Promise((resolve, reject) => {
				oidcCustomUserManager
					.signinPassword(options)
					.then((user: any) => {
						resolve(user);
						this.oidcWasAuthenticated(user);
						//@ts-ignore
						// window.location.reload(true);
						// const loginChannel = new BroadcastChannel("login");
						// loginChannel.postMessage("reload");
					})
					.catch((err: Error) => {
						this.setOidcError(
							errorPayload("authenticateOidcPassword", err)
						);
						reject(err);
					});
			});
		},
	};

	return store("oidc-store", state, getters, actions);
};

export default createStoreModule;
