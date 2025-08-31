import { render, screen } from "@/test/test-utils";
import { describe, it, expect, vi } from "vitest";
import { PaginationButtons } from "./pagination-buttons";

describe("PaginationButtons", () => {
  const defaultProps = {
    currentPage: 0,
    hasNextPage: true,
    onPreviousPage: vi.fn(),
    onNextPage: vi.fn(),
    visibleItemsCount: 3,
    totalItemsCount: 100,
  };

  it("should display current page information", () => {
    render(<PaginationButtons {...defaultProps} />);

    expect(screen.getByText(/Page 1 of 34 \(100 total\)/)).toBeInTheDocument();
  });

  it("should disable previous button on first page", () => {
    render(<PaginationButtons {...defaultProps} currentPage={0} />);

    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });

  it("should enable previous button on later pages", () => {
    render(<PaginationButtons {...defaultProps} currentPage={2} />);

    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).not.toBeDisabled();
  });
});
