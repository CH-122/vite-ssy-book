import https from 'https';
import http from 'http';

export default function httpImportPlugin() {
	return {
		name: 'esbuild:http',
		setup(build: any) {
			build.onResolve({ filter: /^https?:\/\// }, (args: any) => {
				return {
					path: args.path,
					namespace: 'http-url'
				};
			});

			// 拦截间接依赖的路径，并重写路径
			// tip: 间接依赖同样会被自动带上 `http-url`的 namespace
			build.onResolve({ filter: /.*/, namespace: 'http-url' }, (args: any) => {
				console.log('onresolve', args.path, args.importer);
				console.log('onresolve', new URL(args.path, args.importer).toString());
				console.log('--------------------------------------------');

				return {
					// 重写路径
					path: new URL(args.path, args.importer).toString(),
					namespace: 'http-url'
				};
			});

			build.onLoad(
				{ filter: /.*/, namespace: 'http-url' },
				async (args: any) => {
					const contents = await new Promise((resolve, reject) => {
						function fetch(url: string) {
							console.log(`downloading:${url}`);
							const lib = url.startsWith('https') ? https : http;

							const req = lib
								.get(url, (res) => {
									if ([301, 302, 307].includes(res.statusCode as number)) {
										fetch(
											new URL(res.headers.location as string, url).toString()
										);
										req.abort();
									} else if (res.statusCode === 200) {
										const chunks: any[] = [];
										res.on('data', (chunk) => {
											chunks.push(chunk);
										});
										res.on('end', () => {
											resolve(Buffer.concat(chunks).toString('utf-8'));
										});
									} else {
										reject(
											new Error(`HTTP ${res.statusCode} ${res.statusMessage}`)
										);
									}
								})
								.on('error', (err) => {
									reject(err);
								});
						}
						fetch(args.path);
					});
					return {
						contents
					};
				}
			);
		}
	};
}
