import { Route, Switch } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { Orders } from "../components/Orders/Orders";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <PrivateRoute path="/orders">
      <Orders />
    </PrivateRoute>
  </Switch>
);
