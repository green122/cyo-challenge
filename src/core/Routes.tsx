import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { NoMatch } from "../components/NoMatch/NoMatch";
import { OrderDetails } from "../components/OrderDetails/OrderDetails";
import { Orders } from "../components/Orders/Orders";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <PrivateRoute path="/orders" exact>
      <Orders />
    </PrivateRoute>
    <PrivateRoute path="/orders/:orderId">
      <OrderDetails />
    </PrivateRoute>
    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
);
