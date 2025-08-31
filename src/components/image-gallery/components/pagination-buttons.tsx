import { Button, HStack, Text } from "@chakra-ui/react";

export function PaginationButtons({
  currentPage,
  hasNextPage,
  onPreviousPage,
  onNextPage,
  visibleItemsCount,
  totalItemsCount,
}: {
  currentPage: number;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  visibleItemsCount: number;
  totalItemsCount: number;
}) {
  return (
    <HStack gap={4} justify="center" mt={6}>
      <Button
        onClick={onPreviousPage}
        disabled={currentPage === 0}
        colorScheme="blue"
        variant="outline"
        aria-label={`Go to previous page (currently on page ${currentPage + 1})`}
      >
        ← Previous
      </Button>

      <Text fontSize="sm" color="gray.600">
        {visibleItemsCount
          ? `Page ${currentPage + 1} of ${Math.ceil(totalItemsCount / visibleItemsCount)} (${totalItemsCount} total)`
          : `Page ${currentPage + 1}`}
      </Text>

      <Button
        onClick={onNextPage}
        disabled={!hasNextPage}
        variant="outline"
        aria-label={`Go to next page (currently on page ${currentPage + 1})`}
      >
        Next →
      </Button>
    </HStack>
  );
}
