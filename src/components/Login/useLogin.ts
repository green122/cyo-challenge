import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useGetDep } from "../../core/ServiceProvider";
import { IRouteState } from "../../types/common";

export function useLogin() {
  const history = useHistory();
  const location = useLocation<IRouteState>();
  const auth = useGetDep("auth");

  const [signinError, setError] = useState("");
  const [isSigningIn, setIsSigning] = useState(false);

  const { from } = location.state || { from: { pathname: "/" } };

  const signIn = async (email: string, password: string) => {
    setIsSigning(true);
    setError("");

    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.replace(from);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSigning(false);
    }
  };

  return { signIn, signinError, isSigningIn };
}
