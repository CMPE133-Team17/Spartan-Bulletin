import React from 'react'; // ES6 js
import {Link} from 'react-router-dom';

function Nav() {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark top">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navMainMenu" class="navbar-collapse collapse">
                <div class="logo">
                    
                    <img src={require("../Spartan-Bulletin-logo.png")} alt="spartan bulleting logo" style={{maxWidth: 120, maxHeight: 120}}/>
                </div>
                <div class="navbar-nav ml-auto">
                    <Link to='/' className="nav-item nav-link active">Home</Link>
                    <Link to='/forum' className="nav-item nav-link">Forum</Link>
                    <Link to='/settings' className='nav-item nav-link '>Settings</Link>
                    <Link to='/DM' className='nav-item nav-link '>DM</Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;