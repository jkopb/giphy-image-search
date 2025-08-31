import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePagination } from './use-pagination';

describe('usePagination', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePagination({ itemsPerPage: 3 }));
    
    expect(result.current.currentPage).toBe(0);
    expect(result.current.offset).toBe(0);
    expect(result.current.canGoToPreviousPage).toBe(false);
  });

  it('should handle goToNextPage correctly', () => {
    const { result } = renderHook(() => usePagination({ itemsPerPage: 3 }));
    
    act(() => {
      result.current.goToNextPage();
    });
    
    expect(result.current.currentPage).toBe(1);
    expect(result.current.offset).toBe(3);
    expect(result.current.canGoToPreviousPage).toBe(true);
  });

  it('should not go below page 0', () => {
    const { result } = renderHook(() => usePagination({ itemsPerPage: 3 }));
    
    act(() => {
      result.current.goToPreviousPage();
    });
    
    expect(result.current.currentPage).toBe(0);
    expect(result.current.offset).toBe(0);
    expect(result.current.canGoToPreviousPage).toBe(false);
  });

  it('should handle zero items per page', () => {
    const { result } = renderHook(() => usePagination({ itemsPerPage: 0 }));
    
    expect(result.current.currentPage).toBe(0);
    expect(result.current.offset).toBe(0);
    // When itemsPerPage is 0, canGoToNextPage(0) should return true because 0 === 0
    expect(result.current.canGoToNextPage(0)).toBe(true);
    expect(result.current.canGoToNextPage(1)).toBe(false);
  });

  it('should handle canGoToNextPage logic correctly', () => {
    const { result } = renderHook(() => usePagination({ itemsPerPage: 3 }));
    
    // Should return true when current items count equals items per page
    expect(result.current.canGoToNextPage(3)).toBe(true);
    
    // Should return false when current items count is less than items per page
    expect(result.current.canGoToNextPage(2)).toBe(false);
    expect(result.current.canGoToNextPage(0)).toBe(false);
  });

  it('should handle resetToFirstPage correctly', () => {
    const { result } = renderHook(() => usePagination({ itemsPerPage: 3 }));
    
    // Go to page 2 first
    act(() => {
      result.current.goToNextPage();
      result.current.goToNextPage();
    });
    
    expect(result.current.currentPage).toBe(2);
    expect(result.current.offset).toBe(6);
    
    // Reset to first page
    act(() => {
      result.current.resetToFirstPage();
    });
    
    expect(result.current.currentPage).toBe(0);
    expect(result.current.offset).toBe(0);
    expect(result.current.canGoToPreviousPage).toBe(false);
  });

  it('should handle custom initial page', () => {
    const { result } = renderHook(() => usePagination({ 
      itemsPerPage: 3, 
      initialPage: 2 
    }));
    
    expect(result.current.currentPage).toBe(2);
    expect(result.current.offset).toBe(6);
    expect(result.current.canGoToPreviousPage).toBe(true);
  });

  it('should handle setCurrentPage correctly', () => {
    const { result } = renderHook(() => usePagination({ itemsPerPage: 3 }));
    
    act(() => {
      result.current.setCurrentPage(5);
    });
    
    expect(result.current.currentPage).toBe(5);
    expect(result.current.offset).toBe(15);
    expect(result.current.canGoToPreviousPage).toBe(true);
  });

  it('should handle large page numbers', () => {
    const { result } = renderHook(() => usePagination({ itemsPerPage: 10 }));
    
    act(() => {
      result.current.setCurrentPage(1000);
    });
    
    expect(result.current.currentPage).toBe(1000);
    expect(result.current.offset).toBe(10000);
    expect(result.current.canGoToPreviousPage).toBe(true);
  });
});
