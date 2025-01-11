import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { InputOptions, OutputOptions, rollup } from 'rollup';

const inputOptions: InputOptions = {
	input: './src/index.ts',
	plugins: [typescript(), resolve(), commonjs()]
};

const outputOptions: OutputOptions[] = [
	{
		dir: './dist/es',
		format: 'esm'
	},
	{
		dir: './dist/cjs',
		format: 'cjs'
	},
	{
		dir: './dist/umd',
		format: 'umd',
		name: 'rollup-test2'
	}
];

async function build() {
	let bundle;
	let buildFaild = false;
	try {
		bundle = await rollup(inputOptions);

		for (const outputOption of outputOptions) {
			const { output } = await bundle.generate(outputOption);

			await bundle.write(outputOption);
		}
	} catch (err) {
		buildFaild = true;
	}

	if (bundle) {
		await bundle.close();
	}

	process.exit(buildFaild ? 1 : 0);
}

build();
