import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

type FormData = {
  email: string;
  password: string;
};

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const minPassportLength = 6;

export const Login: React.FC = () => {
  const { signIn, signinError, isSigningIn } = useLogin();

  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ email, password }) => {
    signIn(email, password);
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" ref={register({ pattern: emailReg })} />
      {errors.email && <div>Wrong email</div>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        ref={register({ minLength: minPassportLength })}
      />
      {errors.password && (
        <div>
          Wrong password format. Should be min {minPassportLength} characters
        </div>
      )}
      <button data-testid="submit" type="submit" disabled={isSigningIn}>
        Sign In
      </button>
      {signinError && <div>{signinError}</div>}
    </form>
  );
};
