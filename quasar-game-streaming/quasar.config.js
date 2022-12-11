/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const ESLintPlugin = require("eslint-webpack-plugin");

const { configure } = require("quasar/wrappers");

const path = require("path");

const fs = require("fs");

module.exports = configure(function (ctx) {
	return {
		// https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
		supportTS: {
			// tsLoaderConfig: {
			// 	// `appendTsSuffixTo: [/\.vue$/]` and `transpileOnly: true` are added by default and cannot be overridden
			// 	resolve: {
			// 		// Add `.ts` and `.tsx` as a resolvable extension.
			// 		extensions: [".ts", ".tsx", ".js", ".vue", ".jsx"],
			// 	},
			// },
			tsCheckerConfig: {
				eslint: {
					enabled: true,
					files: "./src/**/*.{ts,tsx,js,jsx,vue}",
				},
			},
		},

		// https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
		// preFetch: true,

		// app boot file (/src/boot)
		// --> boot files are part of "main.js"
		// https://v2.quasar.dev/quasar-cli-webpack/boot-files
		boot: [
			"i18n",
			"axios",
			"filters",
			"ajax-bar",
			"screen-size",
			"variable-style",
			"plyr",
			"utils",
			"addressbar-color",
			"class",
			"auth",
			"openapi-client",
			// "auth/oidc-oauth2",
			// "oidc-store",
		],

		// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
		css: ["app.scss", "custom.scss"],

		// https://github.com/quasarframework/quasar/tree/dev/extras
		extras: [
			// 'ionicons-v4',
			"mdi-v5",
			// 'fontawesome-v6',
			// 'eva-icons',
			// 'themify',
			// 'line-awesome',
			// 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

			// 'roboto-font', // optional, you are not bound to it
			"material-icons", // optional, you are not bound to it
		],

		// Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
		build: {
			vueRouterMode: "history", // available values: 'hash', 'history'

			// transpile: false,
			// publicPath: '/',

			// Add dependencies for transpiling with Babel (Array of string/regex)
			// (from node_modules, which are by default not transpiled).
			// Applies only if "transpile" is set to true.
			// transpileDependencies: [],

			// rtl: true, // https://quasar.dev/options/rtl-support
			// preloadChunks: true,
			// showProgress: false,
			// gzip: true,
			// analyze: true,

			// Options below are automatically set depending on the env, set them if you want to override
			// extractCSS: false,

			// https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
			// "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

			// chainWebpack(chain) {
			// 	chain
			// 		.plugin("eslint-webpack-plugin")
			// 		.use(ESLintPlugin, [{ extensions: ["js", "vue"] }]);
			// },
			extendWebpack(cfg) {
				// (cfg.resolve.extensions = [".js", ".jsx", ".ts", ".tsx"]),
				cfg.resolve.alias = {
					...cfg.resolve.alias,

					// Add your own alias like this
					composables: path.resolve(__dirname, "./src/composables"),
					modules: path.resolve(__dirname, "./src/modules"),
					apis: path.resolve(__dirname, "./src/apis"),
				};
			},

			env: require("dotenv").config({
				path: `.env.${process.env.NODE_ENV}`,
			}).parsed,
			// `.env.${process.env.NODE_ENV}`,
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
		devServer: {
			server: {
				type: "https",
			},
			https: {
				key: fs.readFileSync("ssl/localhost.decrypted.key"),
				cert: fs.readFileSync("ssl/localhost.crt"),
				ca: fs.readFileSync("ssl/CA.pem"),
			},
			port: 8080,
			open: true, // opens browser window automatically
			// proxy: {
			// 	"/api": {
			// 		target: "https://api.olidono.org/api/abp/api-definition",
			// 		changeOrigin: true,
			// 		rewrite: (path) => path.replace(/^\/api/, ""),
			// 	},
			// 	"/Abp": {
			// 		target: "https://api.olidono.org",
			// 		changeOrigin: true,
			// 		rewrite: (path) => path.replace(/^\/api/, ""),
			// 	},
			// },
		},

		// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
		framework: {
			config: {
				loadingBar: {
					/* look at QuasarConfOptions from the API card */
				},
				screen: {
					bodyClasses: true, // <<< add this
				},
			},

			// iconSet: 'material-icons', // Quasar icon set
			lang: "vi", // Quasar language pack

			// For special cases outside of where the auto-import strategy can have an impact
			// (like functional components as one of the examples),
			// you can manually specify Quasar components/directives to be available everywhere:
			//
			// components: [],
			// directives: [],

			// Quasar plugins
			plugins: [
				"LoadingBar",
				"Notify",
				"AddressbarColor",
				"LocalStorage",
				"SessionStorage",
				"Cookies",
			],
		},

		animations: "all", // --- includes all animations
		// https://quasar.dev/options/animations
		// animations: [],

		// https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
		ssr: {
			pwa: false,

			// manualStoreHydration: true,
			// manualPostHydrationTrigger: true,

			prodPort: 3000, // The default port that the production server should use
			// (gets superseded if process.env.PORT is specified at runtime)

			maxAge: 1000 * 60 * 60 * 24 * 30,
			// Tell browser when a file from the server should expire from cache (in ms)

			chainWebpackWebserver(chain) {
				chain
					.plugin("eslint-webpack-plugin")
					.use(ESLintPlugin, [{ extensions: ["js"] }]);
			},

			middlewares: [
				ctx.prod ? "compression" : "",
				"render", // keep this as last one
			],
		},

		// https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
		pwa: {
			workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
			workboxOptions: {}, // only for GenerateSW

			// for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
			// if using workbox in InjectManifest mode

			chainWebpackCustomSW(chain) {
				chain
					.plugin("eslint-webpack-plugin")
					.use(ESLintPlugin, [{ extensions: ["js"] }]);
			},

			manifest: {
				name: `Game Streaming`,
				short_name: `Game Streaming`,
				description: `A app use for watch and live streaming game`,
				display: "standalone",
				orientation: "portrait",
				background_color: "#ffffff",
				theme_color: "#027be3",
				icons: [
					{
						src: "icons/icon-128x128.png",
						sizes: "128x128",
						type: "image/png",
					},
					{
						src: "icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icons/icon-256x256.png",
						sizes: "256x256",
						type: "image/png",
					},
					{
						src: "icons/icon-384x384.png",
						sizes: "384x384",
						type: "image/png",
					},
					{
						src: "icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
		cordova: {
			// noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
		capacitor: {
			hideSplashscreen: true,
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
		electron: {
			bundler: "packager", // 'packager' or 'builder'

			packager: {
				// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
				// OS X / Mac App Store
				// appBundleId: '',
				// appCategoryType: '',
				// osxSign: '',
				// protocol: 'myapp://path',
				// Windows only
				// win32metadata: { ... }
			},

			builder: {
				// https://www.electron.build/configuration/configuration

				appId: "quasar-game-streaming",
			},

			// "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

			chainWebpackMain(chain) {
				chain
					.plugin("eslint-webpack-plugin")
					.use(ESLintPlugin, [{ extensions: ["js"] }]);
			},

			chainWebpackPreload(chain) {
				chain
					.plugin("eslint-webpack-plugin")
					.use(ESLintPlugin, [{ extensions: ["js"] }]);
			},
		},
	};
});
