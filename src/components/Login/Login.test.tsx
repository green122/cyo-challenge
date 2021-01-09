import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "./Login";
import * as auth from "../../services/auth.service";
jest.mock("../../services/auth.service");

const mockedDeps = {
  auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
};
const TestWrapperContext = React.createContext(mockedDeps);

const TestBed: React.FC = ({ children }) => (
  <TestWrapperContext.Provider value={mockedDeps}>
    <MemoryRouter>{children}</MemoryRouter>
  </TestWrapperContext.Provider>
);

const promise = Promise.resolve();
describe("Signin Component", () => {
  it("should call submit when the correct data is entered", async () => {
    const authSpy = jest.spyOn(auth, "signInWithEmailAndPassword");
    const { getByTestId, getByLabelText } = render(
      <TestBed>
        <Login />
      </TestBed>
    );

    const emailField = getByLabelText("Email");
    const passwordField = getByLabelText("Password");
    const submitBtn = getByTestId("submit");

    fireEvent.change(emailField, { target: { value: "fakeMail@mail.com" } });
    fireEvent.change(passwordField, { target: { value: "fakePassword" } });
    fireEvent.click(submitBtn);
    await act(() => promise);

    expect(authSpy).toHaveBeenCalledWith("fakeMail@mail.com", "fakePassword");
  });

  it("shouldnt call submit when the wrong data is entered", async () => {
    const authSpy = jest.spyOn(auth, "signInWithEmailAndPassword");
    const { getByTestId, getByLabelText } = render(
      <TestBed>
        <Login />
      </TestBed>
    );

    const emailField = getByLabelText("Email");
    const passwordField = getByLabelText("Password");
    const submitBtn = getByTestId("submit");

    fireEvent.change(emailField, {
      target: { value: "fakeMail@somethingbad" },
    });
    fireEvent.change(passwordField, { target: { value: "fakePassword" } });
    fireEvent.click(submitBtn);
    await act(() => promise);

    expect(authSpy).not.toHaveBeenCalled();
  });
});
