import { CaptionPlacement } from "@/components/caption-placement-select/caption-placement-select.types";
import { Heading, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CaptionForm } from "./components/caption-form";
import { ImageCard } from "./components/image-card";
import { ImageGallery } from "./components/image-gallery";
import { SearchForm } from "./components/search-form";
import { usePagination } from "./hooks/use-pagination";
import { GiphyData } from "./queries/giphy-image-search/giphy-data.types";
import useGiphyData from "./queries/giphy-image-search/use-giphy-data";

function App() {
  const [searchInput, setSearchInput] = useState<string>("");

  const [captionText, setcaptionText] = useState<string>("");
  const [captionPlacement, setCaptionPlacement] = useState<CaptionPlacement>(
    CaptionPlacement.OverlayTop
  );

  const imagesPerPage = 3;
  const {
    currentPage,
    goToNextPage,
    goToPreviousPage,
    resetToFirstPage,
    offset,
  } = usePagination({
    itemsPerPage: imagesPerPage,
  });

  const [giphySearchQuery, setGiphySearchQuery] = useState<string>("");
  const {
    data: giphyResponse,
    isLoading,
    isError,
    error,
  } = useGiphyData(giphySearchQuery, imagesPerPage, offset);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setGiphySearchQuery(searchInput);
      resetToFirstPage();
    }
  };

  // Update page title for accessibility
  useEffect(() => {
    if (giphySearchQuery) {
      document.title = `Giphy Search: ${giphySearchQuery} - Giphy Image Search`;
    } else {
      document.title = "Giphy Image Search";
    }
  }, [giphySearchQuery]);

  return (
    <VStack
      gap={8}
      p={8}
      maxW="1200px"
      mx="auto"
      minH="100vh"
      justify="center"
      align="center"
    >
      <Heading>Giphy Image Search</Heading>

      <VStack gap={8}>
        <SearchForm
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearch={handleSearch}
        />
        <CaptionForm
          captionText={captionText}
          onCaptionTextChange={setcaptionText}
          captionPlacement={captionPlacement}
          onCaptionPlacementChange={setCaptionPlacement}
        />
      </VStack>

      <ImageGallery<GiphyData>
        data={giphyResponse?.data}
        getItemKey={(gif) => gif.id}
        visibleItemsCount={giphyResponse?.pagination.count ?? 0}
        totalItemsCount={giphyResponse?.pagination.total_count ?? 0}
        isLoading={isLoading}
        isError={isError}
        error={error}
        hasNextPage={giphyResponse?.hasNextPage ?? false}
        searchQuery={giphySearchQuery}
        currentPage={currentPage}
        onRetry={handleSearch}
        onPreviousPage={goToPreviousPage}
        onNextPage={goToNextPage}
        renderItem={(gifData) => (
          <ImageCard
            src={gifData.images.downsized_medium.url}
            alt={gifData.alt_text || gifData.title}
            title={gifData.title}
            captionText={captionText}
            captionPlacement={captionPlacement}
          />
        )}
      />
    </VStack>
  );
}

export default App;
