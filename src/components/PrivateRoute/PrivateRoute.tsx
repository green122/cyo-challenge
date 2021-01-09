import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useGetIsSignedIn } from "../../core/ServiceProvider";

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  let isSignedIn = useGetIsSignedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
