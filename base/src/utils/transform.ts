import { transform } from 'esbuild';

async function runTransform() {
	const content = await transform(
		'const isNull = (str: string):boolean => str.length === 0',
		{
			loader: 'tsx',
			sourcemap: true
		}
	);

	console.log(content);
}

runTransform();
