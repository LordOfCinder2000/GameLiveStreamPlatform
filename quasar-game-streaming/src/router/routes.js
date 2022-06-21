const routes = [
	{
		path: "/",
		name: "root",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				name: "home",
				component: () => import("pages/HomePage.vue"),
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
			},
			{
				path: "lives",
				name: "lives",
				component: () => import("pages/category/ListLive.vue"),
			},
			{
				path: "ttg",
				name: "watch-live",
				component: () => import("pages/WatchLive.vue"),
			},
			{
				path: "user",
				name: "user",
				component: () => import("pages/user/UserManage.vue"),
				redirect: { name: "user-profile" },
				children: [
					{
						path: "profile",
						name: "user-profile",
						component: () => import("pages/user/UserProfile.vue"),
					},
					{
						path: "wallet",
						name: "user-wallet",
						component: () => import("pages/user/UserWallet.vue"),
					},
					{
						path: "subscribe",
						name: "user-subscribe",
						component: () => import("pages/user/UserSubscribe.vue"),
					},
				],
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
