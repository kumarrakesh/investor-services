import { Switch, Route } from 'react-router';
import LoginPage from '../LoginPage/LoginPage';
import Dashboard from '../User/Dashboard/Dashboard';
import Profile from '../User/Profile/Profile';
import Statements from '../User/Statements/Statements';
import Grievances from '../User/Grievances/Grievances';
import AdminDashboard from '../Admin/Dashboard/Dashboard';
import Investors from '../Admin/Investors/Investors';
import Funds from '../Admin/Funds/Funds';
import Investments from '../Admin/Investments/Investments';
import AdminGrievances from '../Admin/Grievances/Grievances';
import AddInvestor from '../Admin/Investors/AddInvestor/AddInvestor';
import AddFund from '../Admin/Funds/AddFund/AddFund';
import AddTransaction from '../Admin/Investments/AddInvestment/AddTransaction';
import Folios from '../Admin/Folios/Folios';
import AddFolio from '../Admin/Folios/AddFolio/AddFolio';
import FolioStatements from '../Admin/Folios Statements/FolioStatements';
import FolioAddTransaction from '../Admin/Folios/AddTransaction/FolioAddTransaction';
import UserFolioStatement from '../User/Dashboard/UserFolioStatement/UserFolioStatement';
import ViewDetail from '../Admin/Folios Statements/ViewDetail';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>

      <Route exact path="/dashboard">
        <Dashboard />
      </Route>

      <Route exact path="/dashboard/folioStatement">
        <UserFolioStatement />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

      <Route exact path="/statements">
        <Statements />
      </Route>

      <Route exact path="/queries">
        <Grievances />
      </Route>

      <Route exact path="/admin/dashboard">
        <AdminDashboard />
      </Route>

      <Route exact path="/admin/investors">
        <Investors />
      </Route>

      <Route exact path="/admin/funds">
        <Funds />
      </Route>

      <Route exact path="/admin/investments">
        <Investments />
      </Route>

      <Route exact path="/admin/queries">
        <AdminGrievances />
      </Route>

      <Route exact path="/admin/investor/add">
        <AddInvestor />
      </Route>

      <Route exact path="/admin/funds/add">
        <AddFund />
      </Route>

      <Route exact path="/admin/investments/add">
        <AddTransaction />
      </Route>

      <Route exact path="/admin/folios">
        <Folios role="folio" />
      </Route>

      <Route exact path="/admin/folios/add">
        <AddFolio />
      </Route>

      <Route exact path="/admin/folios/addTransaction">
        <FolioAddTransaction />
      </Route>

      <Route exact path="/admin/folioStatements">
        <Folios role="statement" />
        {/* <FolioStatements /> */}
      </Route>

      <Route exact path="/admin/folioStatements/viewDetail">
        <ViewDetail />
      </Route>
    </Switch>
  );
};

export default Routes;
