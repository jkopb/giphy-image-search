import React from "react";
import { Box, Button, HStack, Spinner, Text } from "@chakra-ui/react";
import { PaginationButtons } from "./components/pagination-buttons";

export function ImageGallery<T>({
  data,
  isLoading,
  isError,
  error,
  searchQuery,
  currentPage,
  hasNextPage,
  onRetry,
  onPreviousPage,
  onNextPage,
  renderItem,
  getItemKey,
  visibleItemsCount,
  totalItemsCount,
}: {
  data: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  searchQuery: string;
  currentPage: number;
  hasNextPage: boolean;
  onRetry: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey: (item: T, index: number) => string | number;
  visibleItemsCount: number;
  totalItemsCount: number;
}) {
  return (
    <Box
      w="100%"
      minH="400px"
      maxW="1000px"
      mx="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {isLoading && (
        <Box textAlign="center" w="100%" role="status" aria-live="polite">
          <Spinner size="lg" aria-hidden="true" />
          <Text mt={2}>Loading images...</Text>
        </Box>
      )}

      {isError && (
        <Box
          textAlign="center"
          color="red.500"
          w="100%"
          role="alert"
          aria-live="assertive"
        >
          <Text>Error: {error?.message}</Text>
          <Button
            mt={2}
            onClick={onRetry}
            size="sm"
            aria-label="Retry loading images"
          >
            Try Again
          </Button>
        </Box>
      )}

      {data && data.length === 0 && !isLoading && (
        <Box textAlign="center" w="100%">
          <Text>No images found for "{searchQuery}"</Text>
        </Box>
      )}

      {data && data.length > 0 && (
        <Box w="100%">
          <Text mb={4} fontSize="lg" fontWeight="bold" textAlign="center">
            {visibleItemsCount
              ? `Showing ${data.length} of ${totalItemsCount} images for "${searchQuery}"`
              : `Showing ${data.length} images for "${searchQuery}"`}
          </Text>

          <HStack gap={4} justify="center" flexWrap="wrap">
            {data.map((item, index) => (
              <React.Fragment key={getItemKey(item, index)}>
                {renderItem(item, index)}
              </React.Fragment>
            ))}
          </HStack>

          <PaginationButtons
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            visibleItemsCount={visibleItemsCount}
            totalItemsCount={totalItemsCount}
          />
        </Box>
      )}
    </Box>
  );
}
