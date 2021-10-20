import React, { useState } from 'react';
import Routes from './Components/Routes/routes';
import { UserContext } from './userContext';
function App() {
  const [userData, setUserData] = useState({ role: '', token: '' });
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Routes />
    </UserContext.Provider>
  );
}

export default App;
