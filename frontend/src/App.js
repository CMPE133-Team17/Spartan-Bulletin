//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import SpartanMap from './components/Map';
import Forum from './components/Forum';
import Settings from './components/Settings';
import Resources from './components/Resources';
import DM from './components/DM';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
  	<Router>
      <div className="App">
	  <Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/forum" element={<Forum />} />
				<Route path="/map" element={<SpartanMap />} />
				<Route path="/resources" element={<Resources />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/DM" element={<DM />} />
			</Routes>
       </div>
    </Router>
  );
}

export default App;
