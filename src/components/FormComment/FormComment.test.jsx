/**
 * skenario testing
 *
 * - FormComment component
 *   - should handle comment typing correctly
 *   - should call postHandler function when Create Comment button is clicked
 */

import React from "react";
import {
  describe, it, expect, afterEach, vi,
} from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import FormComment from "./FormComment";

expect.extend(matchers);

describe("FormComment component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle commet typing correctly", async () => {
    // arrange
    const mockSetInput = vi.fn();
    render(<FormComment postHandler={() => {}} setInput={() => {}} />);
    const commentInput = screen.getByTestId("editable-field");

    // action
    await userEvent.click(commentInput);
    await userEvent.keyboard("Bagus sekali");

    // assert
    expect(commentInput.textContent).toBe("Bagus sekali");
  });
});
