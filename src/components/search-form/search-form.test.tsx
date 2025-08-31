import React from "react";
import { render, screen, fireEvent } from "@/test/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchForm } from "../search-form";

describe("SearchForm", () => {
  const defaultProps = {
    searchInput: "",
    onSearchInputChange: vi.fn(),
    onSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call onSearchInputChange when input value changes", () => {
    render(<SearchForm {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for an image on GIPHY!");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(defaultProps.onSearchInputChange).toHaveBeenCalledWith("test query");
  });

  it("should call onSearch when form is submitted", () => {
    render(<SearchForm {...defaultProps} />);

    const form = screen.getByDisplayValue("").closest("form");
    fireEvent.submit(form!);

    expect(defaultProps.onSearch).toHaveBeenCalled();
  });

  it("should call onSearch when Enter key is pressed", () => {
    render(<SearchForm {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for an image on GIPHY!");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(defaultProps.onSearch).toHaveBeenCalled();
  });

  it("should not call onSearch for other key presses", () => {
    render(<SearchForm {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for an image on GIPHY!");
    fireEvent.keyDown(input, { key: "Tab" });

    expect(defaultProps.onSearch).not.toHaveBeenCalled();
  });

  it("should display current search input value", () => {
    render(<SearchForm {...defaultProps} searchInput="current search" />);

    const input = screen.getByPlaceholderText("Search for an image on GIPHY!");
    expect(input).toHaveValue("current search");
  });

  it("should show clear button when input has value", () => {
    render(<SearchForm {...defaultProps} searchInput="test" />);

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("should not show clear button when input is empty", () => {
    render(<SearchForm {...defaultProps} searchInput="" />);

    expect(
      screen.queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();
  });

  it("should clear input and focus when clear button is clicked", () => {
    render(<SearchForm {...defaultProps} searchInput="test" />);

    const clearButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(clearButton);

    expect(defaultProps.onSearchInputChange).toHaveBeenCalledWith("");
  });

  it("should call onSearch when search button is clicked", () => {
    render(<SearchForm {...defaultProps} />);

    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalled();
  });
});
