import { writeFile } from 'fs/promises';
import path from 'path';
import { generateHTML, createLink, createScript } from '../utils';

export default function generateHtmlPlugin() {
	return {
		name: 'esbuild:html',
		setup(build: any) {
			const { outdir } = build.initialOptions;

			build.onEnd(async (buildResult: any) => {
				if (buildResult.errors.length) return;

				const { metafile } = buildResult;

				const scripts: any[] = [];
				const links: any[] = [];

				if (metafile) {
					const { outputs } = metafile;
					const assets = Object.keys(outputs);

					assets.forEach((asset) => {
						if (asset.endsWith('.js')) {
							scripts.push(createScript(asset.replace(outdir, '')));
						} else if (asset.endsWith('.css')) {
							links.push(createLink(asset.replace(outdir, '')));
						}
					});
				}

				const templateContent = generateHTML(scripts, links);

				const templatePath = path.join(process.cwd(), outdir, 'index.html');

				await writeFile(templatePath, templateContent);
			});
		}
	};
}
