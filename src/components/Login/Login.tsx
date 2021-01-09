import { useHistory, useLocation } from "react-router-dom";
import { useGetDep } from "../../core/ServiceProvider";
import { IRouteState } from "../../types/common";

export const Login: React.FC = () => {
  let history = useHistory();
  let location = useLocation<IRouteState>();
  let auth = useGetDep("auth");

  let { from } = location.state || { from: { pathname: "/" } };

  let login = async () => {
    await auth.signInWithEmailAndPassword(
      "coding-challenge@construyo.de",
      "coding-challenge@construyo.de"
    );
    history.replace(from);
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};
