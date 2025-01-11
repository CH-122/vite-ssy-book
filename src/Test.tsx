// 用于测试 esbuild 打包

import Server from 'react-dom/server';

const Greet = () => <h1>Hello, juejin!</h1>;
console.log(Server.renderToString(<Greet />));
