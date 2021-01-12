import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "../scenes/Login/Login";
import { NoMatch } from "../components/NoMatch/NoMatch";
import { OrderDetails } from "../scenes/OrderDetails/OrderDetails";
import { Orders } from "../scenes/Orders/Orders";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/orders" />
    </Route>
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
