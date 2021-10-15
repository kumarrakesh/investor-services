import { Switch, Route } from 'react-router';
import LoginPage from '../LoginPage/LoginPage';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Statements from '../Statements/Statements';

const Routes = ()=>{

    return(
        <Switch>
            <Route path="/" exact>
            <LoginPage />
            </Route>
            <Route path="/dashboard" >
            <Dashboard />
            </Route>
            <Route path="/profile">
            <Profile />
            </Route>
            <Route path="/statements">
            <Statements/>
            </Route>
        </Switch>
    );
};

export default Routes;

