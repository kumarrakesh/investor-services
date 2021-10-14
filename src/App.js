import React from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './Components/LoginPage/LoginPage';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import Statements from './Components/Statements/Statements';

import {LOGIN_ROUTE ,DASHBOARD_ROUTE,
        PROFILE_ROUTE,STATEMENTS_ROUTE} from './routes';

function App() {
  return (
    <>
      <Switch>
        <Route path={LOGIN_ROUTE} exact>
          <LoginPage />
        </Route>
        <Route path={DASHBOARD_ROUTE} >
          <Dashboard />
        </Route>
        <Route path={PROFILE_ROUTE}>
          <Profile />
        </Route>
        <Route path={STATEMENTS_ROUTE}>
          <Statements/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
