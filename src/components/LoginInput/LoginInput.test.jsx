/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from "react";
import {
  describe, it, expect, afterEach, vi,
} from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import LoginInput from "./LoginInput";

expect.extend(matchers);

describe("LoginInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle email typing correctly", async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByPlaceholderText("Email");

    // action
    await userEvent.type(emailInput, "email@example.com");

    // assert
    expect(emailInput).toHaveValue("email@example.com");
  });

  it("should handle password typing correctly", async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText("Password");

    // action
    await userEvent.type(passwordInput, "passwordTest");

    // assert
    expect(passwordInput).toHaveValue("passwordTest");
  });

  it("should call login function when login button is clicked", async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "email@example.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "passwordTest");

    const loginButton = await screen.getByRole("button", { name: "Masuk" });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: "email@example.com",
      password: "passwordTest",
    });
  });
});
