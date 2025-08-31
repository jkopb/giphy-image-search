import { useState, useCallback } from "react";


export const usePagination = ({
  initialPage = 0,
  itemsPerPage,
}: {
  initialPage?: number;
  itemsPerPage: number;
}
): {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  resetToFirstPage: () => void;
  canGoToNextPage: (currentItemsCount: number) => boolean;
  canGoToPreviousPage: boolean;
  offset: number;
} => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const resetToFirstPage = () => {
    setCurrentPage(0);
  };

  const canGoToNextPage = useCallback((currentItemsCount: number) => {
    return currentItemsCount === itemsPerPage;
  }, [itemsPerPage]);

  const canGoToPreviousPage = currentPage > 0;

  const offset = currentPage * itemsPerPage;

  return {
    currentPage,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    resetToFirstPage,
    canGoToNextPage,
    canGoToPreviousPage,
    offset,
  };
};
