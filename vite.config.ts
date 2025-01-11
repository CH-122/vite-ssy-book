import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteImagemin from 'vite-plugin-imagemin';
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteImagemin({
			optipng: {
				optimizationLevel: 7,
				bitDepthReduction: true,
				colorTypeReduction: true,
				paletteReduction: true
			},
			pngquant: {
				quality: [0.1, 0.2], // 更激进的质量压缩
				speed: 1,
				strip: true, // 删除不必要的元数据
				dithering: 0.5, // 添加抖动以保持视觉质量
				posterize: 4
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox'
					},
					{
						name: 'removeEmptyAttrs',
						active: false
					}
				]
			}
		})
	],
	css: {},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	}
});
