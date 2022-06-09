const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				name: "Home",
				component: () => import("pages/HomePage.vue"),
			},
			{
				path: "games",
				component: () => import("pages/Category/ListGame.vue"),
			},
			{
				path: "lives",
				component: () => import("pages/Category/ListLive.vue"),
			},
			{
				path: "ttg",
				name: "WatchLive",
				component: () => import("pages/WatchLive.vue"),
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
