import React from "react";
import { render, screen, fireEvent } from "@/test/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CaptionForm } from "./caption-form";
import { CaptionPlacement } from "../caption-placement-select/caption-placement-select.types";

describe("CaptionForm", () => {
  const defaultProps = {
    captionText: "",
    onCaptionTextChange: vi.fn(),
    captionPlacement: CaptionPlacement.OverlayTop,
    onCaptionPlacementChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call onCaptionTextChange when input value changes", () => {
    render(<CaptionForm {...defaultProps} />);

    const input = screen.getByPlaceholderText("Enter a custom image caption");
    fireEvent.change(input, { target: { value: "Test caption" } });

    expect(defaultProps.onCaptionTextChange).toHaveBeenCalledWith(
      "Test caption"
    );
  });

  it("should display current caption text value", () => {
    render(<CaptionForm {...defaultProps} captionText="Current caption" />);

    const input = screen.getByPlaceholderText("Enter a custom image caption");
    expect(input).toHaveValue("Current caption");
  });

  it("should show clear button when caption text has value", () => {
    render(<CaptionForm {...defaultProps} captionText="Test caption" />);

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("should not show clear button when caption text is empty", () => {
    render(<CaptionForm {...defaultProps} captionText="" />);

    expect(
      screen.queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();
  });

  it("should clear caption text when clear button is clicked", () => {
    render(<CaptionForm {...defaultProps} captionText="Test caption" />);

    const clearButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(clearButton);

    expect(defaultProps.onCaptionTextChange).toHaveBeenCalledWith("");
  });
});
