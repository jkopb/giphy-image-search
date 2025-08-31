import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchGiphyData } from "./use-giphy-data";

// Mock fetch
const mockFetch = vi.fn();

describe("fetchGiphyData", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    // Mock fetch globally
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should build correct URL with all parameters", async () => {
    const mockResponse = {
      data: [],
      meta: { status: 200, msg: "OK" },
      pagination: { offset: 0, total_count: 0, count: 0 },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await fetchGiphyData("test query", 5, 10);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.giphy.com/v1/stickers/search")
    );

    const calledUrl = mockFetch.mock.calls[0][0];
    const url = new URL(calledUrl);

    expect(url.searchParams.get("q")).toBe("test query");
    expect(url.searchParams.get("limit")).toBe("5");
    expect(url.searchParams.get("offset")).toBe("10");
    expect(url.searchParams.get("rating")).toBe("g");
    expect(url.searchParams.get("api_key")).toBeDefined();
    expect(url.searchParams.get("api_key")).toHaveLength(32); // Giphy API keys are 32 characters
  });

  it("should calculate hasNextPage correctly when more results available", async () => {
    const mockResponse = {
      data: [
        {
          id: "1",
          title: "Test",
          images: { downsized_medium: { url: "test.gif" } },
        },
      ],
      meta: { status: 200, msg: "OK" },
      pagination: {
        offset: 0,
        total_count: 100,
        count: 10,
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGiphyData("test", 10, 0);

    // offset (0) + count (10) < total_count (100) = true
    expect(result.hasNextPage).toBe(true);
  });

  it("should calculate hasNextPage correctly when on last page", async () => {
    const mockResponse = {
      data: [
        {
          id: "1",
          title: "Test",
          images: { downsized_medium: { url: "test.gif" } },
        },
      ],
      meta: { status: 200, msg: "OK" },
      pagination: {
        offset: 95,
        total_count: 100,
        count: 5,
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGiphyData("test", 5, 95);

    // offset (95) + count (5) < total_count (100) = false
    expect(result.hasNextPage).toBe(false);
  });

  it("should handle API errors with non-200 status", async () => {
    const mockResponse = {
      data: [],
      meta: { status: 500, msg: "Internal Server Error" },
      pagination: { offset: 0, total_count: 0, count: 0 },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await expect(fetchGiphyData("test", 3, 0)).rejects.toThrow(
      "Giphy API error: Internal Server Error"
    );
  });

  it("should handle HTTP error responses", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
    });

    await expect(fetchGiphyData("test", 3, 0)).rejects.toThrow(
      "Giphy API error: 429 Too Many Requests"
    );
  });

  it("should transform API response correctly", async () => {
    const mockResponse = {
      data: [
        {
          id: "1",
          title: "Test GIF",
          alt_text: "Test alt text",
          images: {
            downsized_medium: {
              url: "https://example.com/test.gif",
              width: "300",
              height: "200",
            },
          },
        },
      ],
      meta: { status: 200, msg: "OK" },
      pagination: {
        offset: 0,
        total_count: 50,
        count: 1,
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGiphyData("test", 1, 0);

    // Test that we're returning the transformed data structure
    expect(result.data).toEqual(mockResponse.data);
    expect(result.pagination).toEqual(mockResponse.pagination);
    expect(result.hasNextPage).toBe(true);
  });

  it("should handle network errors", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchGiphyData("test", 3, 0)).rejects.toThrow("Network error");
  });
});
