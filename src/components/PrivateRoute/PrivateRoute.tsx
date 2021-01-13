import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useGetIsSignedIn } from "../../core/AuthProvider";

type PrivateRouteProps = RouteProps & {
  loginRoute?: string;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  loginRoute = "/login",
  ...rest
}) => {
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
              pathname: loginRoute,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
