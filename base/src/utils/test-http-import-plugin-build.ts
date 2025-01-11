import { build } from 'esbuild';
import httpImportPlugin from '../plugins/http-import-plugin';

async function runEsbuild() {
	const result = await build({
		// 指定工作目录
		absWorkingDir: process.cwd(),
		// 指定入口文件
		entryPoints: ['src/TestHttpImportPlugin.tsx'],
		// 指定输出目录
		outdir: 'esbuildDist',
		// 指定打包模式
		bundle: true,
		// 指定打包格式
		format: 'esm',
		// 指定外部依赖
		external: [],
		// 是否压缩
		minify: false,
		// 是否拆分
		splitting: true,
		// 是否生成 sourcemap
		sourcemap: true,
		// 是否开启树摇
		treeShaking: true,
		// 是否生成 metafile
		metafile: true,
		// 是否写入文件
		write: true,
		// 指定 loader
		loader: {
			'.png': 'base64'
		},
		// 指定插件
		plugins: [httpImportPlugin()]
	}).then(() => {
		console.log('🚀 Build Finished!');
	});

	console.log(result);
}

runEsbuild();
