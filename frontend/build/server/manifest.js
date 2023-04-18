const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.b1ab3610.js","imports":["_app/immutable/entry/start.b1ab3610.js","_app/immutable/chunks/index.2bf5045d.js","_app/immutable/chunks/singletons.ecee8e96.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.5ae5ae0b.js","imports":["_app/immutable/entry/app.5ae5ae0b.js","_app/immutable/chunks/index.2bf5045d.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-cde3768a.js'),
			() => import('./chunks/1-16755273.js'),
			() => import('./chunks/2-5644511e.js'),
			() => import('./chunks/3-0ec3a732.js'),
			() => import('./chunks/4-ca9324d3.js'),
			() => import('./chunks/5-155e9a8c.js'),
			() => import('./chunks/6-375dfb64.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/proyection-populations",
				pattern: /^\/proyection-populations\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/proyection-populations/[province]/[period]",
				pattern: /^\/proyection-populations\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"province","optional":false,"rest":false,"chained":false},{"name":"period","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/residential-variations-stats",
				pattern: /^\/residential-variations-stats\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
