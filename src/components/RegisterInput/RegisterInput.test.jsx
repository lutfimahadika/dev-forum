/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call Register function when Register button is clicked
 */

import React from "react";
import {
  describe, it, expect, afterEach, vi,
} from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import RegisterInput from "./RegisterInput";

expect.extend(matchers);

describe("RegisterInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle name typing correcly", async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByPlaceholderText("Name");

    // action
    await userEvent.type(nameInput, "Halo Name");

    // assert
    expect(nameInput).toHaveValue("Halo Name");
  });

  it("should handle email typing correcly", async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = screen.getByPlaceholderText("Email");

    // action
    await userEvent.type(emailInput, "email@example.com");

    // assert
    expect(emailInput).toHaveValue("email@example.com");
  });

  it("should handle password typing correcly", async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByPlaceholderText("Password");

    // action
    await userEvent.type(passwordInput, "passwordTest");

    // assert
    expect(passwordInput).toHaveValue("passwordTest");
  });

  it("should call register function when register button is clicked", async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = screen.getByPlaceholderText("Name");
    await userEvent.type(nameInput, "Halo Name");
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "email@example.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "passwordTest");

    const registerButton = await screen.getByRole("button", { name: "Daftar" });

    // action
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      name: "Halo Name",
      email: "email@example.com",
      password: "passwordTest",
    });
  });
});
