//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Forum from './components/Forum';
import Settings from './components/Settings';
import DM from './components/DM';
import Login from './components/Login';
import Signup from './components/signup';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
  	<Router>
      <div className="App">
	  <Nav />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/forum" element={<Forum />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/DM" element={<DM />} />
				<Route path='/home' element={<Home />} />
				<Route path='/signup' element={<Signup/>} />
			</Routes>
       </div>
    </Router>
  );
}

export default App;
