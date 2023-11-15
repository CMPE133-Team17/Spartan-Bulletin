//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Forum from './components/Forum';
import Settings from './components/Settings';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
  	<Router>
      <div className="App">
      	<header className="App-header">        
      		<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/forum" element={<Forum />} />
			</Routes>
      	</header>
       </div>
    </Router>,
	<Router>
		<div className="App">
      	<header className="App-header">        
      		<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
      	</header>
       </div>
	</Router>
  );
}

export default App;
