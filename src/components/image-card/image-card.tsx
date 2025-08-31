import { Box, Image, Text } from "@chakra-ui/react";
import { CaptionPlacement } from "@/components/caption-placement-select/caption-placement-select.types";
import { CaptionOverlay } from "./components/caption-overlay";

export function ImageCard({
  src,
  alt,
  title,
  captionText,
  captionPlacement,
}: {
  src: string;
  alt: string;
  title: string;
  captionText: string;
  captionPlacement: CaptionPlacement;
}) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={3}
      w="300px"
      h={{ base: "250px", md: "320px" }}
      flexShrink={0}
      boxShadow="md"
      display="flex"
      flexDirection="column"
    >
      <Box
        position="relative"
        h="200px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={src}
          alt={alt}
          borderRadius="md"
          maxW="100%"
          maxH="100%"
          objectFit="contain"
        />

        {captionText && (
          <>
            {captionPlacement === CaptionPlacement.OverlayTop && (
              <CaptionOverlay captionText={captionText} position="top" />
            )}

            {captionPlacement === CaptionPlacement.OverlayBottom && (
              <CaptionOverlay captionText={captionText} position="bottom" />
            )}
          </>
        )}
      </Box>

      {captionText && captionPlacement === CaptionPlacement.Below && (
        <Text
          mt={2}
          fontSize="sm"
          fontWeight="medium"
          textAlign="center"
          color="blue.600"
          flexShrink={0}
        >
          {captionText}
        </Text>
      )}

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Text
          fontSize="sm"
          fontWeight="medium"
          textAlign="center"
          wordBreak="break-word"
          overflowWrap="break-word"
          mb={1}
          minH="2.5em"
          maxH="3.5em"
          lineHeight="1.2"
          overflow="hidden"
        >
          {title}
        </Text>
      </Box>
    </Box>
  );
}
