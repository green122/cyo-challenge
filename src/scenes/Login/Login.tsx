import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { removeExtraSpaces } from "../../core/utils/replaceExtraSpaces";
import { useLogin } from "./useLogin";

const ButtonContainer = styled.div`
  margin-top: 12px;
`;

type FormData = {
  email: string;
  password: string;
};

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const minPassportLength = 6;

//TODO: improve entering by removing extra spaces
export const Login: React.FC = () => {
  const { signIn, signinError, isSigningIn } = useLogin();

  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ email, password }) => {
    signIn(removeExtraSpaces(email), removeExtraSpaces(password));
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="ant-input"
        name="email"
        ref={register({ pattern: emailReg })}
      />
      {errors.email && <div>Wrong email</div>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        className="ant-input"
        name="password"
        type="password"
        ref={register({ minLength: minPassportLength })}
      />
      {errors.password && (
        <div>
          Wrong password format. Should be min {minPassportLength} characters
        </div>
      )}
      <ButtonContainer>
        <Button data-testid="submit" htmlType="submit" disabled={isSigningIn}>
          Sign In
        </Button>
      </ButtonContainer>
      {signinError && <div>{signinError}</div>}
    </form>
  );
};
