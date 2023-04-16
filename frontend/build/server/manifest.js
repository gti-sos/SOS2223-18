const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.a4108d4b.js","imports":["_app/immutable/entry/start.a4108d4b.js","_app/immutable/chunks/index.019f7634.js","_app/immutable/chunks/singletons.3965e01c.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.e016af2a.js","imports":["_app/immutable/entry/app.e016af2a.js","_app/immutable/chunks/index.019f7634.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-6b4e30e3.js'),
			() => import('./chunks/1-55d99b3c.js'),
			() => import('./chunks/2-a680dffe.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
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
