import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useGetIsSignedIn } from "../../core/ServiceProvider";

export const PrivateRoute: React.FC = ({ children, ...rest }) => {
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
