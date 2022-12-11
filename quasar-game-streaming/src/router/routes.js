const routes = [
	{
		path: "/",
		name: "root",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				name: "home",
				component: () => import("pages/TestAuth.vue"),
				meta: {
					isPublic: true,
				},
			},
			{
				path: "test",
				name: "test",
				component: () => import("pages/TestPage.vue"),
			},
			{
				path: "games",
				name: "games",
				component: () => import("pages/category/ListGame.vue"),
				// meta: {
				// 	isPublic: true,
				// },
			},
			{
				path: "lives",
				name: "lives",
				component: () => import("pages/category/ListLive.vue"),
				meta: {
					isPublic: true,
				},
			},
			{
				path: "ttg",
				name: "watch-live",
				component: () => import("pages/WatchLive.vue"),
				meta: {
					isPublic: true,
				},
			},
			{
				path: "user",
				name: "user",
				component: () => import("pages/user/UserManage.vue"),
				redirect: { name: "user-profile" },
				meta: {
					isPublic: true,
				},
				children: [
					{
						path: "profile",
						name: "user-profile",
						component: () => import("pages/user/UserProfile.vue"),
						meta: {
							isPublic: true,
						},
					},
					{
						path: "wallet",
						name: "user-wallet",
						component: () => import("pages/user/UserWallet.vue"),
						meta: {
							isPublic: true,
						},
					},
					{
						path: "subscribe",
						name: "user-subscribe",
						component: () => import("pages/user/UserSubscribe.vue"),
						meta: {
							isPublic: true,
						},
					},
				],
			},
		],
	},
	{
		path: "/authentication",
		name: "authentication",
		component: () => import("layouts/AuthLayout.vue"),
		children: [
			{
				path: "login-callback",
				name: "login-callback",
				component: () =>
					import("pages/authentication/LoginCallback.vue"),
				meta: {
					isOidcCallback: true,
				},
			},
			{
				path: "logout-callback",
				name: "logout-callback",
				component: () =>
					import("pages/authentication/LogoutCallback.vue"),
				meta: {
					isOidcCallback: true,
				},
			},
			{
				path: "access-denied",
				name: "access-denied",
				component: () =>
					import("pages/authentication/AccessDenied.vue"),
				meta: {
					isOidcCallback: true,
				},
			},
			{
				path: "silent-callback",
				name: "silent-callback",
				component: () =>
					import("pages/authentication/SilentCallback.vue"),
				meta: {
					isOidcCallback: true,
				},
			},
		],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		name: "error-404",
		component: () => import("pages/error/ErrorNotFound.vue"),
		meta: {
			isPublic: true,
		},
	},
	{
		path: "/403",
		name: "error-403",
		component: () => import("pages/error/ErrorForbidden.vue"),
		meta: {
			isPublic: true,
		},
	},
	{
		path: "/401",
		name: "error-401",
		component: () => import("pages/error/ErrorUnauthorized.vue"),
		meta: {
			isPublic: true,
		},
	},
];

export default routes;
