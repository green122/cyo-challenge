import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useGetDep, useGetIsSignedIn } from "../../core/AuthProvider";
import { IRouteState } from "../../types/common";

export function useLogin() {
  const history = useHistory();
  const location = useLocation<IRouteState>();
  const auth = useGetDep("auth");
  const isSignedIn = useGetIsSignedIn();

  const [signinError, setError] = useState("");
  const [isSigningIn, setIsSigning] = useState(false);

  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }
    history.replace(from);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  const signIn = async (email: string, password: string) => {
    setIsSigning(true);
    setError("");

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSigning(false);
    }
  };

  return { signIn, signinError, isSigningIn };
}
