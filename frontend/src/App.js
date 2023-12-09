import './App.css';
import Nav from './components/Nav';
import SpartanMap from './components/Map';
import Forum from './components/Forum';
import Settings from './components/Settings';
import Resources from './components/Resources';
import DM from './components/DM';
import Login from './components/Login';
import Signup from './components/signup';
import Bulletin from './components/Bulletin';
import BulletinViewer from './components/BulletinViewer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {io} from 'socket.io-client';

function App() {
  
  const socket = io.connect("http://localhost:4000");

  return (
      <Router>
      <div className="App">
      <Nav />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/map" element={<SpartanMap />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/DM" element={<DM socket={socket}/>} />
                <Route path='/bulletin' element={<Bulletin />} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/viewer' element={<BulletinViewer/>} />
            </Routes>
       </div>
    </Router>
  );
}

export default App;