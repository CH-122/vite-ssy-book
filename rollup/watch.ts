import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { watch } from 'rollup';

const watcher = watch({
	// 和 rollup 配置文件中的属性基本一致，只不过多了`watch`配置
	input: './src/index.ts',
	output: [
		{
			dir: 'dist/es',
			format: 'esm'
		},
		{
			dir: 'dist/cjs',
			format: 'cjs'
		},
		{
			dir: 'dist/umd',
			format: 'umd',
			name: 'rollup-test3'
		}
	],
	watch: {
		exclude: ['./node_modules/**'],
		include: ['./src/**']
	},
	plugins: [typescript(), resolve(), commonjs()]
});

// 监听 watch 各种事件
watcher.on('restart', () => {
	console.log('重新构建...');
});

watcher.on('change', (id) => {
	console.log('发生变动的模块id: ', id);
});

watcher.on('event', (e) => {
	if (e.code === 'BUNDLE_END') {
		console.log('打包信息:', e);
	}
});
