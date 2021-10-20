import { Switch, Route } from 'react-router';
import LoginPage from '../LoginPage/LoginPage';
import Dashboard from '../User/Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Statements from '../User/Statements/Statements';
import Grievances from '../User/Grievances/Grievances';
import AdminDashboard from '../Admin/Dashboard/Dashboard';
import Investors from '../Admin/Investors/Investors';
import Funds from '../Admin/Funds/Funds';
import Investments from '../Admin/Investments/Investments';
import AdminGrievances from '../Admin/Grievances/Grievances';
import AddInvestor from '../Admin/Investors/AddInvestor/AddInvestor';
import AddFund from '../Admin/Funds/AddFund/AddFund';


const Routes = ()=>{

    return(
        <Switch>
            <Route path="/" exact><LoginPage /></Route>
            
            <Route path="/dashboard" ><Dashboard /></Route>

            <Route path="/profile"><Profile /></Route>

            <Route path="/statements"><Statements/></Route>
            
            <Route path = "/grievances"><Grievances/></Route>

            <Route path = "/admin/dashboard"><AdminDashboard/></Route>

            <Route path = "/admin/investors"><Investors/></Route>

            <Route path = "/admin/funds"><Funds/></Route>

            <Route path = "/admin/investments"><Investments/></Route>

            <Route path = "/admin/grievances"><AdminGrievances/></Route>

            <Route path = "/admin/investor/add"><AddInvestor/></Route>

            <Route path = "/admin/funds/add"><AddFund/></Route>


        </Switch>
    );
};

export default Routes;

