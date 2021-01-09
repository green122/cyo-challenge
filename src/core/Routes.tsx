import { Route, Switch } from "react-router-dom";
import { Login } from "../components/Login/Login";

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
  </Switch>
);
