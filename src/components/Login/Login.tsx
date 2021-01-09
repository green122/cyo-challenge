import { useGetIsSignedIn } from "../../core/ServiceProvider";

export const Login: React.FC = () => {
  const signed = useGetIsSignedIn();
  console.log(signed);
  return null;
};
