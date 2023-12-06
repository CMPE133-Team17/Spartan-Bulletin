import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Settings() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      const userData = JSON.parse(authCookie);
      setUserData(userData);
      console.log('User data from cookie: ', userData);
    }
  }, []); 
  return (
    <section>
      <div>
        {userData && (
          <div>
            <p>{userData.name}'s Settings!</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Settings;