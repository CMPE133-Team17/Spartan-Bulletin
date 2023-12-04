import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Forum() {
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      const userData = JSON.parse(authCookie);
      setUserData(userData);
      console.log('User data from cookie:', userData);
    }
  }, []);

  const fetchItems = async () => {
    try {
      const data = await fetch('/forum');
      const items = await data.json();
      setItems(items);
    } catch (error) {
      console.error('Error fetching forum items:', error);
    }
  };

  return (
    <section>
      <div>
        {userData && (
          <div>
            <p>Welcome, {userData.name}!</p>
          </div>
        )}
        {items.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.msg}</p>
            <p>{item.username}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forum;
