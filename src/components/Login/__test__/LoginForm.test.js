import {getByPlaceholderText, render, screen } from "@testing-library/react"
import LoginForm from "../LoginForm"
import userEvent from "@testing-library/user-event"


describe("Should login form page details correct" , () => {
    test("should email and password is correct", () => {
      const {getByLabelText, getByTestId} =  render(<LoginForm />)
    const submitBtn = getByTestId("Submit")
    const emailInputNode = getByPlaceholderText("email")
    const passwordInputNode = getByPlaceholderText("password")

    userEvent.type(emailInputNode,"bhagu@gmail.com")
    userEvent.type(passwordInputNode,"Akki94212@")
    expect(emailInputNode.value).toMatch("bhagu@gmail.com")
    expect(passwordInputNode.value).toMatch("Akki94212@")
    })
})