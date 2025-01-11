import './App.css';
import logo from '@/assets/3m.png';
import logo2 from '@/assets/test.png';
import Server from 'react-dom/server';

const Greet = () => <h1>Hello, juejin!</h1>;
console.log(Server.renderToString(<Greet />));

function App() {
	return (
		<>
			<div className="text-3xl font-bold underline">Hello world!</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
			<img src={logo} alt="logo" />
			<img src={logo2} alt="logo2" />
		</>
	);
}

export default App;
