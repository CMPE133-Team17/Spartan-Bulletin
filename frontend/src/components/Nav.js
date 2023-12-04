import React from 'react'; // ES6 js
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



function Nav() {
    const navigate = useNavigate();
    const handleLogout = () => {

    Cookies.remove('auth');
    sessionStorage.removeItem('auth');

    navigate('/login');
};
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark top">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div id="navMainMenu" className="navbar-collapse collapse">
        <div className="logo">
          <img src={require("../Spartan-Bulletin-logo.png")} alt="spartan bulletin logo" style={{ maxWidth: 120, maxHeight: 120 }} />
        </div>
        <div className="navbar-nav ml-auto">
          <Link to='/bulletin' className="nav-item nav-link active">Bulletin</Link>
          <Link to='/map' className="nav-item nav-link active">Map</Link>
          <Link to='/forum' className="nav-item nav-link">Forum</Link>
          <Link to='/DM' className='nav-item nav-link'>DM</Link>
          <Link to='/resources' className='nav-item nav-link'>Resources</Link>
          <Link to='/settings' className='nav-item nav-link'>Settings</Link>
        <button onClick={handleLogout} className="nav-item nav-link btn btn-danger">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;