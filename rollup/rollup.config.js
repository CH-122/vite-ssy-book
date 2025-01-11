import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: ["src/index.ts"],
  output: [
    {
      // 产物输出目录
      dir: "./dist/es",
      // 产物格式
      format: "esm",
    },
    {
      // 产物输出目录
      dir: "./dist/cjs",
      // 产物格式
      format: "cjs",
    },
    {
      // 产物输出目录
      dir: "./dist/umd",
      // 产物格式
      format: "umd",
      name: 'rollup-test'
    },
  ],
  plugins: [
    typescript(),
    resolve(),                    // 解析第三方模块
    commonjs()
  ]
};