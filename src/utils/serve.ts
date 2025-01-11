// 使用 esbuild 启动一个本地服务
import * as esbuild from 'esbuild';

function runServe() {
	esbuild.context({}).then((server) => {
		server
			.serve({
				servedir: 'dist'
			})
			.then((res) => {
				console.log(res.host, res.port);
			});
	});
}

runServe();
